"use client";
import ImageField from "../Form/ImageField";
import TextField from "../Form/TextField";
import Button from "../Button";
import MoneyField from "../Form/MoneyField";
import { useFormState } from "react-dom";
import { createHotel, updateHotel } from "@/app/api/hotels/action";
import Alert from "../Alert";
import { Hotel } from "@/types/Hotel";

const initialState = { message: "", error: false };

type HotelFormProps = {
  hotel?: Hotel;
};

const HotelForm = ({ hotel }: HotelFormProps) => {
  const action = hotel ? updateHotel : createHotel;
  const [state, formAction] = useFormState(action, initialState);

  return (
    <>
      <form className="w-full" action={formAction}>
        {state.error && <Alert type="danger">{state.message}</Alert>}
        {hotel?.id && (
          <TextField
            name="id"
            label="Id"
            id="id"
            type="text"
            defaultValue={`${hotel?.id}`}
            className="sr-only"
          />
        )}
        <ImageField
          name="image"
          label="Selecionar foto"
          id="image"
          defaultValue={hotel?.image as string}
        />
        <TextField
          label="Nome do hospedagem"
          type="text"
          id="name"
          name="name"
          className="mt-2"
          defaultValue={hotel?.name}
          required
        />
        <TextField
          label="Descrição da hospedagem"
          type="text"
          id="description"
          name="description"
          className="mt-2"
          defaultValue={hotel?.description}
          required
        />
        <MoneyField
          id="price"
          label="Preço da diária"
          name="price"
          className="mt-2"
          defaultValue={hotel?.price}
          required
        />
        <TextField
          label="Endereço"
          type="text"
          id="address"
          name="address"
          className="mt-2"
          defaultValue={hotel?.address}
          required
        />
        <Button appearance="primary" type="submit" className="mt-2">
          {hotel ? "Editar" : "Cadastrar-se"}
        </Button>
      </form>
    </>
  );
};

export default HotelForm;
