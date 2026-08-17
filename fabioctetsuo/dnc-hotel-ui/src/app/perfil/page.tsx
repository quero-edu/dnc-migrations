import DetailPage from "@/components/DetailPage";
import { getProfile } from "../api/users/actions";
import Image from "next/image";
import DetailRow from "@/components/DetailListItem/DetailRow";
import Link from "@/components/Link";
import { Reservation } from "@/types/Reservation";
import DetailListItem from "@/components/DetailListItem";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Hotel } from "@/types/Hotel";
import HotelListItem from "@/components/HotelListItem";

type RecentReservationProps = {
  reservation?: Reservation;
};

type MyHotelProps = {
  hotels?: Hotel[];
};

const RecentReservation = ({ reservation }: RecentReservationProps) => {
  if (!reservation) {
    return (
      <div className="mt-10 w-full text-center">Não há reservas ainda!</div>
    );
  }

  return (
    <>
      <div className="my-10">
        <DetailListItem reservation={reservation} />
      </div>
      <Link href="/reservas" className="text-center w-full block">
        Ver todas as reservas
      </Link>
    </>
  );
};

const MyHotels = ({ hotels }: MyHotelProps) => {
  if (!hotels) {
    return (
      <div className="mt-10 w-full text-center">
        Não há hospedagens cadastradas
      </div>
    );
  }

  return (
    <>
      <div className="my-10">
        {hotels.splice(0, 2).map((hotel) => (
          <div key={hotel.id} className="mt-4">
            <HotelListItem hotel={hotel} />
          </div>
        ))}
      </div>
      <Link href="/minhas-hospedagens" className="text-center w-full block">
        Ver todas as minhas hospedagens
      </Link>
    </>
  );
};

const PerfilPage = async () => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const user = await getProfile();

  const asideContainer =
    user.role === "USER"
      ? {
          title: "Reserva mais recente",
          children: <RecentReservation reservation={user.lastReservation} />,
        }
      : {
          title: "Minhas hospedagens",
          children: <MyHotels hotels={user.hotels} />,
        };

  return (
    <DetailPage
      title="Meu perfil"
      previousPage="/"
      asideContainer={asideContainer}
    >
      <div className="mt-4 flex flex-col justify-center items-center">
        <Image
          src={user.avatar ?? "/default-profile.jpg"}
          alt={`Foto de perfil do ${user.name}`}
          width={300}
          height={300}
          className="rounded-full w-36 h-36 object-cover"
        />
        <div className="flex flex-col mt-4 justify-center">
          <span>
            No DNC Hotel desde {new Date(user.createdAt).getFullYear()}
          </span>
        </div>
      </div>
      <hr className="my-10" />
      <DetailRow title="Nome" description={user.name} className="mt-2" />
      <DetailRow title="E-mail" description={user.email} className="mt-2" />
      <div className="w-full mt-10">
        <Link href="/perfil/editar" className="block text-center">
          Editar perfil
        </Link>
      </div>
    </DetailPage>
  );
};

export default PerfilPage;
