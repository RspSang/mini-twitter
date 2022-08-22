import { useRouter } from "next/router";

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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="#339DDB"
                    >
                      <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                    </svg>
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
