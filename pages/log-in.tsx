import { useForm } from "react-hook-form";
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
  password: string;
}

export default function Login() {
  const [loginMutation, { data, loading }] =
    useMutation<LoginResponse>("/api/log-in");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    if (loading) return;
    console.log(data);
    // loginMutation({ ...data });
  };

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
