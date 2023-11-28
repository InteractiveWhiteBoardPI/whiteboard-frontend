import React, { useState } from "react";
import Button from "../components/button/button.component";
import Login from "../components/auth/login/login.component";
import Register from "../components/auth/register/register.component";
import GoogleSignIn from "../components/auth/google-sign-in/google-sign-in.component";

const Auth = () => {
  const [isRegistrationView, setIsRegistrationView] = useState(false);

  const [bigTitle, setBigTitle] = useState("New user ? Hello!");

  const [smallTitle, setSmallTitle] = useState(
    "please enter your personal informations to sign up :"
  )

  const toggleTitles = () => {
    if (!isRegistrationView) {
      setBigTitle("Welcome back!");
      setSmallTitle("Please sign in with your account's informations :");;
    } else {
      setBigTitle("New user ? Hello!");
      setSmallTitle("Please enter your personal informations to sign up :");
    }
  };

  const toggleView = () => {
    setIsRegistrationView((prev) => !prev);
    toggleTitles();
  };

  return (
    <div className="bg-[#6A6A6A]  h-screen flex items-center justify-center">
      <div className="rounded-[25px] bg-[rgba(0,_0,_0,_0.70)] backdrop-filter-[12px] bg-opacity-50 flex w-[85vw] h-[80vh] p-[2%]">
        <div className="flex absolute w-[80vw] h-[6%] justify-between ">
          <div className="text-[#FFF] font-[Manrope] text-[28px] not-italic font-extrabold leading-[normal]">
            Teamboard
          </div>
          <button class="flex items-center justify-center gap-2 bg-black rounded-lg w-[10%] h-[100%] ">
            <div className="text-white font-manrope text-md font-extrabold leading-normal">
              Explore
            </div>
          </button>
        </div>
        <div className="mt-[5%] ml-auto mr-auto flex rounded-[2.5%] border-[1px] border-white bg-gradient-to-br from-[rgba(0,0,0,0.65)] to-[rgba(0,0,0,0.08)] backdrop-filter-[12px] w-[60vw] h-[60vh] ">
          <div className="flex  w-[30vw] h-[50vh] px-[2%] py-[103px] flex-col justify-center items-center gap-[10px] border-r-[0.5px_solid_#FFF]">
            <div className="text-[#FFF] font-[Manrope] text-[32px] not-italic font-extrabold leading-[normal]">
              {bigTitle}
            </div>
            <div className="text-[rgba(255,_255,_255,_0.80)] font-[Manrope] text-[14px] not-italic font-extrabold leading-[normal]">
              {smallTitle}
            </div>
            <div className="w-3/4">
              <Button
                content={!isRegistrationView ? "R E G I S T E R" : "L O G I N"}
                onClick={toggleView}
              />
            </div>
          </div>
          <div className="my-3 border-l border-white w-1/2 py-2 flex flex-col  items-center justify-center">
            {!isRegistrationView ? <Login /> : <Register />}

            <GoogleSignIn />
          </div>
        </div>


      </div>
    </div>
  );
}
export default Auth