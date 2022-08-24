import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";
import Bird from "../components/bird";
import Button from "../components/button";

export default function Auth() {
  const router = useRouter();
  const { data } = useSWR("/api/me");

  useEffect(() => {
    if (data && data.me) router.push("/");
  }, [data, router]);

  return (
    <div className="flex min-h-screen">
      <section className="w-full bg-[url('https://abs.twimg.com/sticky/illustrations/lohp_1302x955.png')] flex items-center justify-center">
        <div className="p-20 w-full ">
          <Bird fillColor={"white"} />
        </div>
      </section>
      <section className="w-full flex px-[16px] flex-col justify-center">
        <div className="w-10">
          <Bird />
        </div>
        <div>
          <span className="block text-5xl font-bold my-[48px]">
            Happening now
          </span>
          <span className="text-2xl font-bold">Join Twitter today.</span>
        </div>
        <div className="mt-[48px]">
          <div className="space-y-4 w-1/2">
            <Button
              text="Sign Up"
              type="fill"
              onClick={() => router.push("create-account")}
            />
            <Button text="Log In" onClick={() => router.push("log-in")} />
          </div>
        </div>
      </section>
    </div>
  );
}
