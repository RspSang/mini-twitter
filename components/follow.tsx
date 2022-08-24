interface FollowProps {
  imgUrl: string;
  name: string;
  id: string;
}

export default function Follow({ imgUrl, name, id }: FollowProps) {
  return (
    <div className="py-2.5">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2 items-center">
          <img src={imgUrl} className="w-10 rounded-full" />
          <div className="flex flex-col -space-y-1">
            <div className="flex items-center">
              <span className="font-medium">{name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="#339DDB"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-gray-500 text-sm">@{id}</span>
          </div>
        </div>
        <div className="bg-black text-white font-semibold rounded-3xl py-1 px-4 text-sm">
          Follow
        </div>
      </div>
    </div>
  );
}
