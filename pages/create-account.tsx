import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import Input from "../components/input";
import Modal from "../components/modal";
import useMutation from "../lib/client/useMutation";

interface IForm {
  name: string;
  email: string;
  result?: string;
}

interface CreateAccountResponse {
  ok: boolean;
  error?: string;
}

export default () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<IForm>();
  const [createAccount, { data, loading }] = useMutation<CreateAccountResponse>(
    "/api/create-account"
  );

  const onSubmit = (data: IForm) => {
    if (loading) return;
    createAccount({ ...data });
  };
  const clearError = () => {
    clearErrors("result");
  };
  useEffect(() => {
    if (data?.ok) {
      alert("account created please log in");
      router.push({
        pathname: "/log-in",
      });
    }
    if (data?.error) {
      setError("result", { message: data.error });
    }
  }, [data, router]);
  return (
    <Modal type="signup" backPath="/auth">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col my-4 justify-center items-center">
          <div className="w-3/4 space-y-2">
            <Input
              name="name"
              register={register("name", {
                required: "Please write down your name.",
              })}
              type="text"
              onFocus={clearError}
              placeholder="Name"
              required
            />
            {errors?.name?.message}
            <Input
              name="email"
              register={register("email", {
                required: "Please write down your email.",
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                  message: "Only allow email",
                },
              })}
              type="email"
              onFocus={clearError}
              placeholder="Email"
              required
            />
            {errors?.email?.message}
            {errors?.result?.message}
          </div>
        </div>
        <div className="w-1/2 mx-auto mt-8">
          <Button type="fill" text="Create" />
        </div>
      </form>
    </Modal>
  );
};
