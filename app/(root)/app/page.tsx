import React from "react";
import { redirect } from "next/navigation";

const ApplicationMainPage = () => {
  return redirect("/app/dashboard");
};

export default ApplicationMainPage;
