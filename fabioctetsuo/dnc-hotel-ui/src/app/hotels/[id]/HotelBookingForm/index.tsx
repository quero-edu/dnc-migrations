"use client";
import TextField from "@/components/Form/TextField";
import CalendarField from "@/components/Form/CalendarField";
import { Hotel } from "@/types/Hotel";
import { ChangeEvent, useState } from "react";
import { getFormattedPrice } from "@/helpers/format/money";
import Button from "@/components/Button";
import { useFormState } from "react-dom";
import { reserveHotelById } from "@/app/api/reservations/actions";
import Alert from "@/components/Alert";

type HotelBookingFormType = {
  hotel: Hotel;
};

const getNightsInHotel = (checkin: string | null, checkout: string | null) => {
  if (!checkin || !checkout) return 1;

  const start = new Date(checkin).getTime();
  const end = new Date(checkout).getTime();

  const millinsecondsDiff = end - start;

  const nights = millinsecondsDiff / (1000 * 60 * 60 * 24);

  return nights;
};

const initialState = { message: "", error: false };

const HotelBookingForm = ({ hotel }: HotelBookingFormType) => {
  const [state, formAction] = useFormState(reserveHotelById, initialState);
  const today = new Date().toISOString().substring(0, 10);
  const [checkinDate, setCheckinDate] = useState<string | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<string | null>(null);
  const estimatedPrice =
    getNightsInHotel(checkinDate, checkoutDate) * hotel.price;

  return (
    <form action={formAction} className="flex w-full flex-col mt-2">
      <TextField
        id="hotelId"
        name="hotelId"
        defaultValue={hotel.id}
        label="ID do hotel"
        readOnly
        hidden
      />
      <div className="w-full flex">
        <CalendarField
          id="checkIn"
          name="checkIn"
          label="Data de check-in"
          className="w-full m-5"
          required
          min={today}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setCheckinDate(event.target.value);
          }}
        />
        <CalendarField
          id="checkOut"
          name="checkOut"
          label="Data de check-out"
          className="w-full m-5"
          required
          min={checkinDate ?? today}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setCheckoutDate(event.target.value);
          }}
        />
      </div>
      <div className="flex w-full justify-between font-bold mt-6">
        <span>Valor total</span>
        <span>{getFormattedPrice(estimatedPrice)}</span>
      </div>
      <hr className="mt-10" />
      {state.error && <Alert type="danger">{state.message}</Alert>}
      <Button
        appearance="primary"
        type="submit"
        disabled={false}
        className="mt-10 block"
      >
        Reservar
      </Button>
    </form>
  );
};

export default HotelBookingForm;
