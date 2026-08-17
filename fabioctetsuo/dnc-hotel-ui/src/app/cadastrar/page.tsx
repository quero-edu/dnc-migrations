"use client";
import Link from "@/components/Link";
import UserForm from "@/components/UserForm";

const CadastrarPage = () => {
  return (
    <section className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Entrar ou cadastrar-se</span>
      <UserForm />
      <span className="mt-2">ou</span>
      <Link href="/login" className="my-2">
        Já possuo um cadastro
      </Link>
    </section>
  );
};

export default CadastrarPage;
