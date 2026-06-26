import CardWrapper from "@/components/auth/CardWrapper";
import RegisterForm from "@/components/auth/RegisterForm";
import Image from "next/image";
import React from "react";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div
      className={
        "flex justify-center lg:flex-row  md:flex-col-reverse py-10 min-w-64 2xl:py-0 gap-6 items-center bg-card rounded-lg  border border-border shadow-xs"
      }
    >
      <div className={"px-8 md:pr-0 md:pl-0 pl-8 lg:pl-16 w-114 min-w-64 "}>
        <CardWrapper
          headerTitle={"Welcome Back"}
          headerSubTitle={
            "Enter your email and password to access your account."
          }
          oAuth={true}
          BackButtonHref={"/auth/register"}
          BackButtonTitle={"Don't have an account?"}
          BackButtonHrefTitle={"Register now"}
        >
          <LoginForm />
        </CardWrapper>
      </div>
      <Image
        className={"w-160 h-160  2xl:w-200 2xl:h-200   md:block hidden"}
        src={"/auth/login.svg"}
        alt={"Registering"}
        height={700}
        width={700}
      />
    </div>
  );
};

export default LoginPage;
