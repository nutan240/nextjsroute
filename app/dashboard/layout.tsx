"use client";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import Image1 from "../img/image.png";


interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  const router = useRouter();
  return (
    <div className="w-[100%]">
      <nav
        style={{
          background:
            "linear-gradient(to left, #ee7724, #d8363a, #dd3675, #b44593)", 
          
        }}
        className=" text-white py-4 px-5 flex justify-between items-center"
      >
        <h3 className="text-xl">LOGO</h3>
        <ul className="flex items-center gap-7 font-bold">
          <li
            className="cursor-pointer"
            onClick={() => router.push("/dashboard/home")}
          >
            Home
          </li>
          <li
            className="cursor-pointer"
            onClick={() => router.push("/dashboard/about")}
          >
            About us
          </li>
          <li
            className="cursor-pointer"
            onClick={() => router.push("/dashboard/contact")}
          >
            Contact Us
          </li>
          <li className="cursor-pointer">Login</li>
        </ul>
      </nav>
      <div className="flex">
        <div
         
          className="h-screen w-[170px] text-blue-900 text-2xl bg-blue-200 font-semibold "
        >
          <ul className="pt-4 flex flex-col gap-4 px-5  w-auto ">
            <li
              className="cursor-pointer  w-auto "
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </li>

            <li
              className="cursor-pointer"
              onClick={() => router.push("/dashboard/profile")}
            >
              Profile
            </li>
          </ul>
        </div>
        <Box sx={{backgroundImage:` url( ${Image1} )` , height:'600px' , width:'900px' , margin:'auto'}}>{props.children}</Box>
      </div>
    </div>
  );
};
export default DashboardLayout;
