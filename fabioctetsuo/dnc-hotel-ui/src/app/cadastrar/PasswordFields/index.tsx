"use client";
import TextField from "@/components/Form/TextField";
import { ChangeEvent, useState } from "react";

const PasswordFields = () => {
  const [passwordMatches, setPasswordMatches] = useState<boolean>(true);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = event.target.value;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const password = passwordInput.value;

    setPasswordMatches(confirmPassword === password);
  };

  return (
    <>
      <TextField
        label="Senha"
        type="password"
        id="password"
        name="password"
        className="mt-2"
        required
      />
      <TextField
        label="Confirmar senha"
        type="password"
        id="confirm-password"
        name="confirm-password"
        onChange={handlePasswordChange}
        className="mt-2"
        required
        error={passwordMatches ? false : "Campo de senha não é igual"}
      />
    </>
  );
};

export default PasswordFields;
