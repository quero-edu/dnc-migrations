import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getHotels } from "@/app/api/hotels/action";
import { getFormattedPrice } from "@/helpers/format/money";
import Pagination from "@/components/Pagination";

type SearchParams = {
  page: string;
  query: string;
};

type HomeProps = {
  searchParams: SearchParams;
};

const LIMIT = 8;

export default async function Home({ searchParams }: HomeProps) {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const currentPage = Number(searchParams.page ?? 1);

  const {
    data: hotels,
    per_page,
    page,
    total,
  } = await getHotels(currentPage, LIMIT);

  console.log(hotels);

  return (
    <div>
      <section className="grid grid-cols-1 gap-2 px-5 sm:grid-cols-2 sm:px-10 md:grid-cols-3 lg:grid-cols-4 mt-20">
        {hotels.map((hotel) => (
          <Link href={`/hotels/${hotel.id}`} key={hotel.id}>
            <article className="flex flex-col">
              <div className="w-64 h-48">
                <Image
                  src={hotel.image ?? "/no-hotel.jpg"}
                  width={250}
                  height={250}
                  quality={100}
                  alt={`Foto do hotel ${hotel.name}`}
                  className="object-cover rounded-3xl h-48"
                />
              </div>
              <h3 className="font-bold mt-0">{hotel.name}</h3>
              <span className="mt-2">{hotel.owner.name}</span>
              <span className="mt-2">
                <b>{getFormattedPrice(hotel.price)}</b> noite
              </span>
            </article>
          </Link>
        ))}
      </section>
      <section className="flex justify-center mt-4 mb-8">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(total / per_page)}
          destination="/"
        />
      </section>
    </div>
  );
}
