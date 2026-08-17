import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DetailListItem from "@/components/DetailListItem";
import Link from "@/components/Link";
import { STATUS } from "@/helpers/format/dictionary/status";
import { Reservation } from "@/types/Reservation";
import {
  getReservationsByHotel,
  getReservationsByUser,
} from "@/app/api/reservations/actions";
import { getHotelById } from "@/app/api/hotels/action";
import { DetailPageProps } from "@/types/DetailPage";
import ReservationOwnerListItem from "@/components/DetailListItem/Owner";

type ReducedReservations = {
  pending: Reservation[];
  approved: Reservation[];
  cancelled: Reservation[];
};

const ReservasPage = async ({ params }: DetailPageProps) => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const hotel = await getHotelById(Number(params.id));
  const reservations = await getReservationsByHotel(hotel);

  const { pending, approved, cancelled } =
    reservations.reduce<ReducedReservations>(
      (prev, current) => {
        if (current.status === STATUS.PENDING) {
          return { ...prev, pending: [...prev.pending, current] };
        } else if (current.status === STATUS.APPROVED) {
          return { ...prev, approved: [...prev.approved, current] };
        } else if (current.status === STATUS.CANCELLED) {
          return { ...prev, cancelled: [...prev.cancelled, current] };
        } else {
          return prev;
        }
      },
      { pending: [], approved: [], cancelled: [] }
    );

  return (
    <div className="px-20 py-20">
      <div className="flex justify-between">
        <Link href="/perfil" className="my-10">
          Voltar
        </Link>
        <Link href={`/minhas-hospedagens/${hotel.id}/editar`} className="my-10">
          Editar hospedagens
        </Link>
      </div>
      <h1 className="font-bold text-4xl">{hotel.name}</h1>
      <span className="flex text-2xl font-bold mt-12">
        Solicitações de reservas
      </span>
      <section className="grid grid-cols-1 gap-4 md:gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {pending.map((reservation) => (
          <ReservationOwnerListItem
            reservation={reservation}
            key={reservation.id}
          />
        ))}
      </section>
      <span className="flex text-2xl font-bold mt-12">Reservas anteriores</span>
      <section className="grid grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {approved.map((reservation) => (
          <ReservationOwnerListItem
            reservation={reservation}
            key={reservation.id}
          />
        ))}
      </section>
      <span className="flex text-2xl font-bold mt-12">Reservas canceladas</span>
      <section className="grid grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-3 mt-4">
        {cancelled.map((reservation) => (
          <ReservationOwnerListItem
            reservation={reservation}
            key={reservation.id}
          />
        ))}
      </section>
    </div>
  );
};

export default ReservasPage;
