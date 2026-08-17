"use server"
import axios from '@/api';
import { decryptToken } from '@/helpers/decryptToken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getReservationsByUser } from '../reservations/actions';
import { User, UserProfile } from '@/types/User';
import { getHotelByOwner } from '../hotels/action';

export async function getProfile(): Promise<UserProfile> {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) redirect('/login')

    const {id} = decryptToken(accessToken)

    const { data } = await axios.get<User>(`/users/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })

    if (data.role === 'ADMIN') {
        const hotels = await getHotelByOwner();

        if (hotels) {
            return { ...data, hotels }
        }

        return data;

    } else {
        const [reservation] = await getReservationsByUser();
    
        
        if (reservation) {
            return {...data, lastReservation: reservation}
        }
    
        return data;
    }

}

export async function updateProfile(prevState: any, formData: FormData): Promise<User> {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) redirect('/login')

    try {
        const avatar = formData.get('avatar') as File;
    
        const {id} = decryptToken(accessToken)
    
        const payload = {
            "name": formData.get('name'),
            "email": formData.get('email'),
        }
    
        axios.patch(`/users/${id}`, payload,  {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
    
        if (avatar.size) {
            const formDataAvatar = new FormData()
            formDataAvatar.set('avatar', avatar)
    
            await axios.post('/users/avatar', formDataAvatar, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        }
    } catch (error) {
        console.log('Tratar o erro: ', error)
    }

    redirect('/perfil')

}