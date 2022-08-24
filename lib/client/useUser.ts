import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser() {
  const { data, error } = useSWR("/api/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/auth");
    }
  }, [data, router]);

  return { user: data?.me, isLoading: !data && !error };
}
