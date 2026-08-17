"use client";
import Link from "@/components/Link";
import { Reservation } from "@/types/Reservation";
import { useSession } from "next-auth/react";

type BackButtonProps = {
  reservation: Reservation;
  className?: string;
  text?: string;
};

const BackButton = ({ reservation, className, text }: BackButtonProps) => {
  const { data } = useSession();

  return (
    <Link
      href={
        data?.user.role === "ADMIN"
          ? `/minhas-hospedagens/${reservation.hotel.id}/reservas`
          : "/reservas"
      }
      className={className ?? "block w-full text-center mt-10"}
    >
      {text ?? "Voltar para minhas reservas"}
    </Link>
  );
};

export default BackButton;
