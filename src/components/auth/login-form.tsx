import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { useAuth } from "@/contexts/Auth";

import { LoginProps } from "@/interfaces/auth";
import { required } from "@/utils/validations";
import LogoBrand from "@/assets/logo_brand.png";

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const { handleSignIn, authed } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = async (data: LoginProps) => {
    await handleSignIn(data);

    if (authed) router.push("/home");
  };

  return (
    <div className="p-8 relative w-full h-full">
      <span className="absolute right-[40px]">
        <Image src={LogoBrand} alt="logo brand" width={80} height={80} />
      </span>
      <div className="mt-10">
        <h1 className="text-center text-orange-400 font-bold text-4xl">
          Welcome!
        </h1>
        <form
          className="flex flex-col items-center mt-48"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-2/3 flex flex-col gap-2 mb-4">
            <label htmlFor="name">Name</label>
            <input
              className="p-2 rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              type="name"
              placeholder="name"
              aria-label="name"
              {...register("name", { required })}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </div>
          <div className="w-2/3 flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              className="p-2 rounded-md focus:outline-none focus:ring focus:ring-orange-300"
              type="email"
              placeholder="Email"
              aria-label="email"
              {...register("email", { required })}
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>

          <button
            className="mt-4 bg-orange-400 rounded-md px-6 py-2 text-white font-semibold hover:bg-orange-500 transition-all"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
