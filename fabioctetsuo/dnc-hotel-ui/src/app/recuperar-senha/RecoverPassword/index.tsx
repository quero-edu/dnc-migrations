"use client";
import Button from "@/components/Button";
import TextField from "@/components/Form/TextField";
import Image from "next/image";
import Link from "@/components/Link";
import { recoverPassword } from "../../api/auth/password/actions";
import { useFormState, useFormStatus } from "react-dom";
import Alert from "@/components/Alert";
import PasswordFields from "@/app/cadastrar/PasswordFields";

const initialState = { message: "" };

const ForgotPassword = () => {
  const [state, formAction] = useFormState(recoverPassword, initialState);
  const { pending } = useFormStatus();

  return (
    <form
      className="w-full flex flex-col items-center justify-center"
      action={formAction}
    >
      {state?.message && <Alert type="danger">{state.message}</Alert>}
      <Image
        src="/recover-password.svg"
        alt="Ilustração esqueci minha senha"
        width={172}
        height={167}
        className="mt-6"
      />
      {state?.success ? (
        <>
          <span className="text-xl mt-4">Senha alterada com sucesso!</span>
          <Link href="/login" className="my-6">
            Realizar o login
          </Link>
        </>
      ) : (
        <>
          <TextField
            label="Token de confirmação"
            type="text"
            id="token"
            name="token"
            className="mt-6"
            required
          />
          <PasswordFields />
          <Button
            appearance="primary"
            type="submit"
            className="mt-8"
            disabled={pending}
          >
            Enviar e-mail
          </Button>
          <span className="mt-2">ou</span>
          <Link href="/login" className="my-2">
            Cancelar
          </Link>
        </>
      )}
    </form>
  );
};

export default ForgotPassword;
