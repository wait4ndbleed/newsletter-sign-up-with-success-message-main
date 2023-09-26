"use client";

import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import svgImgDesktop from "../../public/assets/images/illustration-sign-up-desktop.svg";
import svgImgMobile from "../../public/assets/images/illustration-sign-up-mobile.svg";
import svgIcon from "../../public/assets/images/icon-list.svg";
import svgSuccess from "../../public/assets/images/icon-success.svg";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400']
});

const robotoB = Roboto({
  subsets: ['latin'],
  weight: ['700']
});





type Input = {
  email: string;
};

export default function Home() {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Input>();
  const [send, setSend] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleFormSubmit: SubmitHandler<Input> = (data) => {
    setSend(true);
    setEmail(data.email);
    reset();
  };

  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const handleDismiss = () => {
    setSend(false);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    <main className="flex bg-[#27293F] min-h-screen my-auto text-[#272844] items-center justify-center">
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      {!send && (
        <div className="container flex flex-col-reverse md:flex-row font-semibold bg-white max-w-4xl md:p-6 md:rounded-3xl">
          <div className="flex items-center">
          <div className="p-6 mr-10">
            <h1 className={`${robotoB.className} font-bold text-4xl md:text-6xl`}>Stay updated!</h1>
            <p className={`my-4 md:text-lg ${roboto.className}`}>
              Join 60,000+ product managers recieving monthly updates on:
            </p>
            <ul>
              <li className="flex">
                <div className="min-w-fit md:pt-1">
                  <Image src={svgIcon} width={21} alt="" />
                </div>
                <div className={`pl-4 md:text-lg ${roboto.className}`}>
                  Product discovery and building what matters
                </div>
              </li>
              <li className="flex my-3">
                <div className="min-w-fit md:pt-1">
                  <Image src={svgIcon} width={21} alt="" />
                </div>
                <div className={`pl-4 md:text-lg ${roboto.className}`}>
                  Measuring to ensure updates are a success
                </div>
              </li>
              <li className="flex mb-6">
                <div className="min-w-fit md:pt-1">
                  <Image src={svgIcon} width={21} alt="" />
                </div>
                <div className={`pl-4 md:text-lg ${roboto.className}`}>And much more!</div>
              </li>
            </ul>
            <div>
              <div className="flex justify-between text-xs font-bold">
                <div className={`${robotoB.className}`}>Email address</div>
                <div className={`text-red-500 ${robotoB.className}`}>
                  {errors.email && "Valid email required"}
                </div>
              </div>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="ash@loremcompany.com"
                      className={`border 
                      ${
                        errors.email ? "border-red-500 text-red-500 bg-red-300/30 outline-none" : "border-[#9294A0]/40"
                      } rounded-lg p-4 font-normal w-full mt-2 ${roboto.className}`}
                    />
                  )}
                />
                
                <input
                  type="submit"
                  className={`text-xs md:text-base text-center bg-[#232742] text-white rounded-lg w-full p-4 mt-6 cursor-pointer hover:bg-gradient-to-r from-[#ff537b] to-[#ff6938] hover:shadow-lg hover:shadow-[#ff6938]/70 ${roboto.className}`}
                  value="Subscribe to monthly newsletter"
                />
              </form>
            </div>
          </div>
          </div>
          <div>
            {!isMobile && <Image src={svgImgDesktop} alt="" />}

            {isMobile && <Image src={svgImgMobile} className="w-full" alt="" />}
          </div>
        </div>
      )}
      {send && (
        <div className="container flex flex-col max-w-md font-semibold bg-white py-12 px-14 md:rounded-3xl">
          <Image src={svgSuccess} className="w-14 h-14" alt="" />
          <h1 className={`${robotoB.className} text-4xl sm:text-5xl font-bold my-8 `}>
            Thanks for subscribing!
          </h1>
          <p className={`md:text-sm ${roboto.className} mb-6`}>
            A confirmation email has been sent to <strong>{email}</strong>.
            Please open it and click the button inside to confirm your
            subscription
          </p>
          <button
            onClick={handleDismiss}
            className={`text-center bg-[#232742] text-white rounded-lg w-full p-4 mt-52 md:mt-4 cursor-pointer hover:bg-gradient-to-r from-[#ff537b] to-[#ff6938] hover:shadow-lg hover:shadow-[#ff6938]/70 ${roboto.className}`}
          >
            Dismiss message
          </button>
        </div>
      )}
    </main>
  );
}
