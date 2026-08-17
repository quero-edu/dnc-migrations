"use client";
import TextField from "@/components/Form/TextField";
import Button from "@/components/Button";
import Link from "@/components/Link";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (response?.ok) {
      router.push("/");
    } else {
      alert("erro na autenticação");
    }
  };

  return (
    <article className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Entrar ou cadastrar-se</span>

      <h3 className="w-full text-left text-xl pt-4">Bem vindo a DNC Hotel!</h3>
      <form className="w-full" onSubmit={handleSubmit}>
        <TextField
          id="email"
          name="email"
          type="email"
          label="E-mail"
          className="mt-2"
          required
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Senha"
          className="mt-2"
          required
        />
        <Button appearance="primary" type="submit" className="mt-2">
          Continuar
        </Button>
      </form>
      <span className="my-2">ou</span>
      <Link href="/cadastrar" className="my-2">
        Cadastre-se
      </Link>
      <Link href="/esqueci-senha">Esqueci minha senha</Link>
    </article>
  );
}
