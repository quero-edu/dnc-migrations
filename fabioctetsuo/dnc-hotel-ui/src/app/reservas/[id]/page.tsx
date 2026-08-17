import { getReservationById } from "@/app/api/reservations/actions";
import DetailRow from "@/components/DetailListItem/DetailRow";
import DetailPage from "@/components/DetailPage";
import UserDetail from "@/components/UserDetail";
import { getFormattedDate } from "@/helpers/format/date";
import { getFormattedStatus } from "@/helpers/format/dictionary/status";
import { getFormattedPrice } from "@/helpers/format/money";
import { DetailPageProps } from "@/types/DetailPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import BackButton from "./BackButton";

const DetalhesReservaPage = async ({ params }: DetailPageProps) => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const reservation = await getReservationById(Number(params.id));

  return (
    <DetailPage
      title={`Sua reserva na ${reservation.hotel.name}`}
      image={{
        src: reservation.hotel.image ?? "/no-hotel.jpg",
        alt: `Foto do hotel ${reservation.hotel.name}`,
      }}
      backButton={
        <BackButton reservation={reservation} className="" text="Voltar" />
      }
      asideContainer={{
        title: "Informações da estadia",
        children: (
          <div>
            <DetailRow
              title="Status"
              description={getFormattedStatus(reservation.status)}
              className="mt-2"
            />
            <DetailRow
              title="Código de confirmação"
              description={`${reservation.id}`}
              className="mt-2"
            />
            <DetailRow
              title="Valor total"
              description={getFormattedPrice(Math.abs(reservation.total))}
              className="mt-2"
            />
            <DetailRow
              title="Check-in"
              description={getFormattedDate(reservation.checkIn)}
              className="mt-2"
            />
            <DetailRow
              title="Check-out"
              description={getFormattedDate(reservation.checkOut)}
              className="mt-2"
            />
            <hr className="mt-10" />
            <BackButton reservation={reservation} />
          </div>
        ),
      }}
    >
      <UserDetail reservation={reservation} />
      <hr className="my-10" />
      <div className="mt-4 flex flex-col">
        <h3 className="font-bold text-2xl">Endereço</h3>
        <span className="mt-4">{reservation.hotel.address}</span>
      </div>
      <div className="mt-4 flex flex-col">
        <h3 className="font-bold text-2xl">Sobre este espaço</h3>
        <span className="mt-4">{reservation.hotel.description}</span>
      </div>
    </DetailPage>
  );
};

export default DetalhesReservaPage;
