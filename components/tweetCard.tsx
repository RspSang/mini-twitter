import { cls, elapsedTime } from "../lib/client/utils";
import { TweetsWithUser } from "../pages";

interface TweetCardProps {
  userId: number;
  tweet: TweetsWithUser;
  onClick?: () => void;
}

export default function TweetCard({ tweet, onClick, userId }: TweetCardProps) {
  const like = tweet.likes[0]?.userId === userId ? true : false;
  return (
    <div className="py-4">
      <div className="flex justify-between">
        <div className="flex space-x-2 items-center">
          <div className="w-10 h-10 bg-slate-500 rounded-full" />
          <div>
            <div className="space-x-2 text-sm">
              <span className="font-bold">{tweet?.user?.name}</span>
              <span className="text-gray-500">
                @{tweet?.user?.name} · {elapsedTime(tweet?.createdAt)}
              </span>
            </div>
            <div>{tweet?.payload}</div>
          </div>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
      </div>
      <div className="flex justify-around px-4 mt-3">
        <div className="flex space-x-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            className="w-8 h-8 rounded-full p-1 hover:bg-blue-100 hover:cursor-pointer peer hover:text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
            />
          </svg>
          <span className="peer-hover:text-blue-500">3000</span>
        </div>
        <div className="flex space-x-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="2 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            className="w-8 h-8 rounded-full p-1 hover:bg-green-100 hover:cursor-pointer peer hover:text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
          <span className="peer-hover:text-green-500">3000</span>
        </div>
        <div className="flex space-x-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={cls(like ? "#e84118" : "none")}
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke={cls(like ? "#e84118" : "currentColor")}
            className="w-8 h-8 rounded-full p-1 hover:bg-red-100 hover:cursor-pointer peer hover:text-red-500"
            onClick={onClick}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <span className="peer-hover:text-red-500">{tweet._count.likes}</span>
        </div>
        <div className="flex space-x-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            className="w-8 h-8 rounded-full p-1 hover:bg-blue-100 hover:cursor-pointer peer hover:text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
