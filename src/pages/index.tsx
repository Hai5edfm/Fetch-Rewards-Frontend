import { NextPage } from "next";
import Image from "next/image";

import LandingImg from "@/assets/landing_img.jpg";
import { LoginForm } from "@/components/auth/login-form";

const LandingPage: NextPage = () => {
  return (
    <main className="flex">
      <div className="w-1/2 max-h-screen overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-yellow-500/20 z-2" />
        <Image
          src={LandingImg}
          alt="Hero"
          style={{ objectFit: "contain" }}
          loading="lazy"
        />
      </div>
      <section className="w-1/2 bg-slate-50 relative">
        <LoginForm />
      </section>
    </main>
  );
};

export default LandingPage;
