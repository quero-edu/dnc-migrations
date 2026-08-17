import Image from "next/image";
import Link from "next/link";
import { Hotel } from "@/types/Hotel";
import { getFormattedPrice } from "@/helpers/format/money";
import DetailRow from "../DetailListItem/DetailRow";

type HotelListItemProps = {
  hotel: Hotel;
};

const HotelListItem = ({ hotel }: HotelListItemProps) => {
  return (
    <Link
      href={`/minhas-hospedagens/${hotel.id}/reservas`}
      className="flex w-full mt-5 md:mt-0"
    >
      <Image
        src={hotel.image ?? "/no-hotel.jpg"}
        alt={`Foto do hotel ${hotel.name}`}
        width={300}
        height={300}
        className="rounded-lg w-32 h-32 object-cover"
      />
      <div className="w-full flex flex-col justify-between ml-4">
        <b>{hotel.name}</b>
        <div>
          <DetailRow
            title="Endereço"
            description={hotel.address}
            className="mt-1"
          />
          <DetailRow
            title="Preço"
            description={getFormattedPrice(hotel.price)}
            className="mt-1"
          />
        </div>
      </div>
    </Link>
  );
};

export default HotelListItem;
