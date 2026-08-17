import Link from "@/components/Link";
import UserForm from "@/components/UserForm";
import { User } from "@/types/User";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const EditarPage = async () => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  return (
    <section className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Editar perfil</span>
      <UserForm user={session.user as User} />
      <Link href="/login" className="mt-2">
        Voltar
      </Link>
    </section>
  );
};

export default EditarPage;
