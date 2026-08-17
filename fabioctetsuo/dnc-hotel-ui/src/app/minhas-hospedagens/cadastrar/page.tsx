import HotelForm from "@/components/HotelForm";
import Link from "@/components/Link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const CadastrarHotelPage = async () => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  return (
    <section className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Nova hospedagem</span>
      <HotelForm />
      <Link href="/minhas-hospedagens" className="my-2">
        Voltar
      </Link>
    </section>
  );
};

export default CadastrarHotelPage;
