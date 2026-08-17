"use server"
import axios from '@/api'
import { Reservation, ReservationStatus } from '@/types/Reservation';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { getHotelDetail } from '../hotels/action';
import { Hotel } from '@/types/Hotel';

export async function reserveHotelById(prevState: any, formData: FormData) {
    let reservationId;

    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) redirect('/login');
    
    try {
        const payload = {
            hotelId: Number(formData.get('hotelId')),
            checkIn: formData.get('checkIn'),
            checkOut: formData.get('checkOut'),
        }
    
        const {data} = await axios.post('/reservations', payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        reservationId = data.id;
    } catch (error) {
        console.log({error})
        return { ...prevState, message: 'Não foi possível realizar a reserva', error: true }
    }

    redirect(`/reservas/${reservationId}/sucesso`)
}

export async function getReservationById(id: number): Promise<Reservation> {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) redirect('/login');
    
    const { data } = await axios.get(`/reservations/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    const hotel = await getHotelDetail(data.hotelId)

    return { ...data, hotel };
}

export async function getReservationsByUser(): Promise<Reservation[]> {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) redirect('/login');
    
    const { data } = await axios.get(`/reservations/user`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    if (data.length) {
        const reservations = await Promise.all(data.map(async (reservation: Reservation) => {
            const hotel = await getHotelDetail(reservation.hotelId);
            return { ...reservation, hotel }
        }));

        return reservations
    }

    return data;
}


export async function getReservationsByHotel(hotel: Hotel): Promise<Reservation[]> {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) redirect('/login');
    
    const { data } = await axios.get(`/reservations/hotel/${hotel.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })

    if (data.length) {
        const reservations = data.map((reservation: Reservation) => {
            return { ...reservation, hotel }
        });

        return reservations
    }

    return data;
}

export async function updateReservationStatus(reservationId: number, status: ReservationStatus) {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) redirect('/login');
    
    const { data } = await axios.patch(`/reservations/${reservationId}`, { status }, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    return data;
}