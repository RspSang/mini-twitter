import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

interface MeResponse {
  ok: boolean;
  me?: { name: string; email: string };
}

export default () => {
  const router = useRouter();
  const { data } = useSWR<MeResponse>("/api/me");

  return (
    <div>
      {data?.ok ? (
        <>
          <h1>welecome {data?.me?.name}!</h1>
          <h2>your email:{data?.me?.email}</h2>
        </>
      ) : (
        <>
          <button onClick={() => router.push("/log-in")}>Log in</button>
          <button onClick={() => router.push("/create-account")}>
            Sign up
          </button>
        </>
      )}
    </div>
  );
};
