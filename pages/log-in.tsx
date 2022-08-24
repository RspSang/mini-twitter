import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import Button from "../components/button";
import Input from "../components/input";
import Modal from "../components/modal";
import useMutation from "../lib/client/useMutation";

interface LoginResponse {
  ok: boolean;
  error?: string;
}

interface IForm {
  email: string;
}

export default function Login() {
  const router = useRouter();
  const { data: meData } = useSWR("/api/me");
  const [loginMutation, { data, loading }] =
    useMutation<LoginResponse>("/api/log-in");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    if (loading) return;
    loginMutation({ ...data });
  };
  const clearError = () => {
    clearErrors("email");
  };

  useEffect(() => {
    if (meData && meData.me) router.push("/");
    if (data && data.error) setError("email", { message: data.error });
    if (data?.ok) router.push("/");
  }, [data, router, meData]);

  return (
    <Modal type="login" backPath="/auth">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col my-4 justify-center items-center">
          <div className="w-3/4 space-y-2">
            <Input
              name="email"
              register={register("email", {
                required: "Please write down your email.",
              })}
              onFocus={clearError}
              type="email"
              placeholder="Email"
              required
            />
            {errors?.email?.message}
          </div>
        </div>
        <div className="w-1/2 mx-auto mt-8">
          <Button type="fill" text="LogIn" />
        </div>
      </form>
    </Modal>
  );
}
