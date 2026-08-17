import Link from "@/components/Link";
import ForgotPassword from "./ForgotPassword";

const EsqueciSenhaPage = () => {
  return (
    <section className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Entrar ou cadastrar-se</span>
      <ForgotPassword />
      <span className="mt-2">ou</span>
      <Link href="/login" className="my-2">
        Cancelar
      </Link>
    </section>
  );
};

export default EsqueciSenhaPage;
