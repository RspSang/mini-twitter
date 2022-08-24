import { useRouter } from "next/router";
import Bird from "./bird";

interface ModalProps {
  type: "login" | "signup";
  children?: JSX.Element;
  backPath: string;
}

export default function Modal({ type, children, backPath }: ModalProps) {
  const router = useRouter();
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4 text-center ">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-1/2 max-w-lg">
            <div className="bg-white p-4 flex flex-col">
              <div
                className="hover:bg-gray-300 hover:bg-opacity-75 hover:transition-opacity hover:cursor-pointer rounded-full w-5"
                onClick={() => router.push(backPath)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path>
                  </g>
                </svg>
              </div>
              <div className="py-10">
                <div className="flex items-center justify-center flex-col">
                  <div className="w-10">
                    <Bird />
                  </div>
                  <div className="text-2xl font-bold mt-2">
                    {type === "login"
                      ? "Log in to Twitter"
                      : "Create your account"}
                  </div>
                </div>
                <div className="mt-12">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
