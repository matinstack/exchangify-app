import React from "react";
import CardWrapper from "@/components/auth/CardWrapper";
import Image from "next/image";
import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div
      className={
        "flex justify-center lg:flex-row  md:flex-col-reverse py-12 min-w-64 2xl:py-0 gap-6  items-center bg-card rounded-lg  border border-border shadow-xs"
      }
    >
      <div className={"px-8 md:pr-0 md:pl-0 pl-8 lg:pl-16 w-114 min-w-64 "}>
        <CardWrapper
          headerTitle={"Welcome To Expensly"}
          headerSubTitle={"Take control of your money, one expense at a time."}
          oAuth={true}
          BackButtonHref={"/auth/login"}
          BackButtonTitle={"Already have an account?"}
          BackButtonHrefTitle={"Login here"}
        >
          <RegisterForm />
        </CardWrapper>
      </div>
      <Image
        className={
          "w-160 h-160  2xl:w-200 2xl:h-200 py-12 2xl:py-24   md:block hidden"
        }
        src={"/auth/register.svg"}
        alt={"Registering"}
        height={700}
        width={700}
      />
    </div>
  );
};

export default RegisterPage;
