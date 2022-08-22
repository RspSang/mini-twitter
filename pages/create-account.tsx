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
  } = useForm<IForm>();
  const [createAccount, { data, loading }] = useMutation<CreateAccountResponse>(
    "/api/create-account"
  );

  const onSubmit = (data: IForm) => {
    if (loading) return;
    createAccount({ ...data });
  };
  useEffect(() => {
    if (data?.ok) {
      alert("account created please log in");
      router.push({
        pathname: "/log-in",
      });
    }
    if (data?.error) {
      alert(data.error);
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
              placeholder="Name"
              required
            />
            {errors?.name?.message}
            <Input
              name="email"
              register={register("email", {
                required: "Please write down your email.",
              })}
              type="email"
              placeholder="Email"
              required
            />
            {errors?.email?.message}
          </div>
        </div>
        <div className="w-1/2 mx-auto mt-8">
          <Button type="fill" text="Create" />
        </div>
      </form>
    </Modal>
  );
};
