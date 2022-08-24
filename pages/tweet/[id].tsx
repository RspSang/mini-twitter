import { useRouter } from "next/router";
import { userInfo } from "os";
import useSWR from "swr";
import { TweetsWithUser } from "..";
import TweetCard from "../../components/tweetCard";
import useMutation from "../../lib/client/useMutation";
import useUser from "../../lib/client/useUser";

interface TweetResponse {
  ok: boolean;
  tweet: TweetsWithUser;
}

export default function TweetOne() {
  const { user } = useUser();
  const router = useRouter();
  const { data, mutate } = useSWR<TweetResponse>(
    router.query.id ? `/api/tweet/${router.query.id}` : ""
  );
  const [like, { loading }] = useMutation(`/api/tweet/${router.query.id}/like`);
  const backClick = () => {
    router.back();
  };
  const onLikeClick = () => {
    if (loading) return;
    like({});
    mutate();
    // mutate({
    //   ...data,

    //   _count: {
    //     ...data.post._count,
    //     wonderings: data.isWondering
    //       ? data?.post._count.wonderings - 1
    //       : data?.post._count.wonderings + 1,
    //   },
    // });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full text-center ">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-3/5 px-4 py-4">
            <div
              className="p-1 hover:bg-gray-200 hover:cursor-pointer rounded-full w-8"
              onClick={backClick}
            >
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
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </div>
            {data?.ok && data?.tweet ? (
              <TweetCard
                key={data.tweet.id}
                tweet={data.tweet}
                onClick={onLikeClick}
                userId={user.id}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
