"use client";
import { User } from "@/types/User";
import Image from "next/image";

type UserDetailProps = {
  user: User;
};

const UserDetail = ({ user }: UserDetailProps) => {
  return (
    <div className="mt-4 flex">
      <Image
        src={user.avatar ?? "/default-profile.jpg"}
        alt={`Foto do anfitrão ${user.name}`}
        width={56}
        height={56}
        className="rounded-full w-14 h-14 object-cover"
      />
      <div className="flex flex-col ml-2 justify-center">
        <b>Anfitriã(o): {user.name}</b>
        <span className="font-medium">
          Desde {new Date(user.createdAt).getFullYear()}
        </span>
      </div>
    </div>
  );
};

export default UserDetail;
