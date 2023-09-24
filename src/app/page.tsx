"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import svgImgDesktop from "../../.next/static/media/illustration-sign-up-desktop.04371c02.svg";
import svgImgMobile from "../../public/assets/images/illustration-sign-up-mobile.svg";
import svgIcon from "../../public/assets/images/icon-list.svg";
import svgSuccess from "../../public/assets/images/icon-success.svg";

type Input = {
  email: string;
};

export default function Home() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Input>();
  const [send, setSend] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleFormSubmit: SubmitHandler<Input> = (data) => {
    setSend(true);
    setEmail(data.email);
  };

  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    <main className="flex bg-[#27293F] min-h-screen my-auto text-[#272844] items-center justify-center">
      {!send && (
        <div className="container flex flex-col-reverse md:flex-row font-semibold bg-white max-w-4xl md:p-6 md:rounded-3xl">
          <div className="p-10">
            <h1 className="text-5xl font-bold">Stay updated!</h1>
            <p className=" my-3">
              Join 60,000+ product managers recieving monthly updates on:
            </p>
            <ul>
              <li className="flex">
                <div>
                  <Image src={svgIcon} width={21} height={21} alt="" />
                </div>
                <div className="pl-4">
                  Product discovery and building what matters
                </div>
              </li>
              <li className="flex my-3">
                <div>
                  <Image src={svgIcon} width={21} height={21} alt="" />
                </div>
                <div className="pl-4">
                  Measuring to ensure updates are a success
                </div>
              </li>
              <li className="flex mb-6">
                <div>
                  <Image src={svgIcon} width={21} height={21} alt="" />
                </div>
                <div className="pl-4">And much more!</div>
              </li>
            </ul>
            <div>
              <div className="flex justify-between text-xs font-bold">
                <div>Email address</div>
                <div className="text-red-500">
                  {errors.email && "Valid email required"}
                </div>
              </div>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <input
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                  type="text"
                  placeholder="ash@loremcompany.com"
                  className={`border border-[#9294A0]/40 ${
                    errors.email && "border-red-500 text-red-500 bg-red-300/30"
                  } rounded-lg p-4 font-normal w-full mt-2`}
                />
                <input
                  type="submit"
                  className="text-xs md:text-base text-center bg-[#232742] text-white rounded-lg w-full p-4 mt-4 cursor-pointer hover:bg-gradient-to-r from-[#ff537b] to-[#ff6938] hover:shadow-lg hover:shadow-[#ff6938]/70"
                  value="Subscribe to monthly newsletter"
                />
              </form>
            </div>
          </div>
          <div>
            {!isMobile && <img src="https://raw.githubusercontent.com/wait4ndbleed/newsletter-sign-up-with-success-message-main/e751629b257bb1a8b9914dbb8310a303ffe1aae0/public/assets/images/illustration-sign-up-desktop.svg" alt="" />}

            {isMobile && <Image src={svgImgMobile} className="w-full" alt="" />}
          </div>
        </div>
      )}
      {send && (
        <div className="container flex flex-col max-w-md font-semibold bg-white py-12 px-14 md:rounded-3xl">
          <Image src={svgSuccess} className="w-14 h-14" alt="" />
          <h1 className="text-4xl sm:text-5xl font-bold my-8">
            Thanks for subscribing!
          </h1>
          <p className="">
            A confirmation email has been sent to <strong>{email}</strong>.
            Please open it and click the button inside to confirm your
            subscription.
          </p>
          <button className="text-center bg-[#232742] text-white rounded-lg w-full p-4 mt-52 md:mt-4 cursor-pointer hover:bg-gradient-to-r from-[#ff537b] to-[#ff6938] hover:shadow-lg hover:shadow-[#ff6938]/70">
            Dismiss message
          </button>
        </div>
      )}
    </main>
  );
}
