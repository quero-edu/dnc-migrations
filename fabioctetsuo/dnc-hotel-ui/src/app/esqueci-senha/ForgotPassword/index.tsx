"use client";
import Button from "@/components/Button";
import TextField from "@/components/Form/TextField";
import Image from "next/image";
import { forgotPassword } from "../../api/auth/password/actions";
import { useFormState, useFormStatus } from "react-dom";
import Alert from "@/components/Alert";

const initialState = { message: "" };

const ForgotPassword = () => {
  const [state, formAction] = useFormState(forgotPassword, initialState);
  const { pending } = useFormStatus();

  return (
    <form
      className="w-full flex flex-col items-center justify-center"
      action={formAction}
    >
      {state?.message && <Alert type="danger">{state.message}</Alert>}
      <Image
        src="/forgot-password.svg"
        alt="Ilustração esqueci minha senha"
        width={172}
        height={167}
        className="mt-6"
      />
      <TextField
        label="E-mail"
        type="email"
        id="email"
        name="email"
        className="mt-6"
        required
      />
      <Button
        appearance="primary"
        type="submit"
        className="mt-8"
        disabled={pending}
      >
        Enviar e-mail
      </Button>
    </form>
  );
};

export default ForgotPassword;
