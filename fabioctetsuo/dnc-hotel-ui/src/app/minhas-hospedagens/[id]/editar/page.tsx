import { getHotelById } from "@/app/api/hotels/action";
import HotelForm from "@/components/HotelForm";
import Link from "@/components/Link";
import { DetailPageProps } from "@/types/DetailPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const EditarHotelPage = async ({ params }: DetailPageProps) => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const hotel = await getHotelById(Number(params.id));

  return (
    <section className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Editar hospedagem</span>
      <HotelForm hotel={hotel} />
      <Link href="/minhas-hospedagens" className="my-2">
        Voltar
      </Link>
    </section>
  );
};

export default EditarHotelPage;
