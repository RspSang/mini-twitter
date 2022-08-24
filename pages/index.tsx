import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Bird from "../components/bird";
import Follow from "../components/follow";
import Happening from "../components/happening";
import Info from "../components/info";
import CardContainer from "../components/CardContainer";
import SearchBar from "../components/searchBar";
import useMutation from "../lib/client/useMutation";
import useUser from "../lib/client/useUser";
import { followArray, happeningArray } from "../temp";
import MenuContainer from "../components/menuContainer";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { Tweet, User } from "@prisma/client";
import { data } from "autoprefixer";
import { elapsedTime } from "../lib/client/utils";

interface TweetFormData {
  payload: string;
}

interface TweetWithUser extends Tweet {
  user: User;
}

export interface TweetResponse {
  ok: boolean;
  tweets: TweetWithUser[];
  error?: string;
}

export default () => {
  const router = useRouter();
  const { user } = useUser();
  const { register, handleSubmit, setValue } = useForm<TweetFormData>();
  const [logout, { data: logoutData }] = useMutation("/api/logout");
  const onClick = async () => {
    logout({});
  };
  const [tweet, { loading }] = useMutation("/api/tweet");
  const onVaild = ({ payload }: TweetFormData) => {
    if (loading) return;
    tweet({ payload });
    setValue("payload", "");
  };
  const { data: tweetsData, error } = useSWR<TweetResponse>("/api/tweet");

  useEffect(() => {
    if (logoutData) router.push("/auth");
  }, [logoutData, router]);

  return (
    <>
      <div className="flex justify-center py-2 px-12">
        <section className="max-w-[350px] px-4 space-y-4">
          <div className="w-12 px-2">
            <Bird />
          </div>
          <div className="text-xl font-medium space-y-4">
            <MenuContainer title="Home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </MenuContainer>
            <MenuContainer title="Expoler">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 hover:bg-blue-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                />
              </svg>
            </MenuContainer>
            <MenuContainer title="Notifications">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </MenuContainer>
            <MenuContainer title="Messages">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </MenuContainer>
            <MenuContainer title="BookMarks">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </MenuContainer>
            <MenuContainer title="Lists">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </MenuContainer>
            <MenuContainer title="Profile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </MenuContainer>
            <MenuContainer title="More">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </MenuContainer>
            <div className="w-full shadow-md text-center bg-[#339DDB] rounded-3xl text-white font-semibold py-1 hover:bg-[#2c82b4] hover:cursor-pointer">
              Tweet
            </div>
            <button
              onClick={onClick}
              className="border-[#339DDB] shadow-md border-2 w-full rounded-3xl text-[#339DDB] hover:cursor-pointer hover:bg-[#eeebeb]"
            >
              log out
            </button>
          </div>
        </section>
        <section className="max-w-[600px] px-[16px] w-[600px] border-slate-300 border-l-[1px] border-r-[1px]">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">Home</div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
          </div>
          <div className="flex pt-2 border-slate-300 border-b-[1px] space-x-3">
            <div className="w-11 h-10 rounded-full bg-slate-500" />
            <div className="w-full mt-1">
              <form onSubmit={handleSubmit(onVaild)}>
                <input
                  placeholder="What's happening?"
                  {...register("payload", { required: true })}
                  className="w-full pb-6 focus:outline-none font-semibold"
                  type="text"
                />
                <div className="flex justify-between items-center border-t-2 border-slate-300 py-2">
                  <div className="flex text-[#339DDB]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 hover:bg-blue-100 rounded-3xl p-1 hover:cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 hover:bg-blue-100 rounded-3xl p-1 hover:cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 hover:bg-blue-100 rounded-3xl p-1 hover:cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 hover:bg-blue-100 rounded-3xl p-1 hover:cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 hover:bg-blue-100 rounded-3xl p-1 hover:cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 hover:bg-blue-100 rounded-3xl p-1 hover:cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <button className="bg-[#339DDB] text-white font-semibold px-4 py-2 rounded-3xl">
                    Tweet
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="">
            {tweetsData?.ok && tweetsData?.tweets
              ? tweetsData.tweets.map((tweet) => (
                  <div className="border-b-[1px] border-slate-300 py-4">
                    <div className="flex justify-between">
                      <div className="flex space-x-2 items-center">
                        <div className="w-10 h-10 bg-slate-500 rounded-full" />
                        <div>
                          <div className="space-x-2 text-sm">
                            <span className="font-bold">{tweet.user.name}</span>
                            <span className="text-gray-500">
                              @{tweet.user.name} ·{" "}
                              {elapsedTime(tweet.createdAt)}
                            </span>
                          </div>
                          <div>{tweet.payload}</div>
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
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1"
                          stroke="currentColor"
                          className="w-8 h-8 rounded-full p-1 hover:bg-red-100 hover:cursor-pointer peer hover:text-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                        <span className="peer-hover:text-red-500">3000</span>
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
                ))
              : null}
          </div>
        </section>
        <section className="max-w-[350px] px-[16px] space-y-4">
          <SearchBar />
          <CardContainer title="What’s happening">
            {happeningArray?.map((happening, i) => (
              <Happening
                key={i}
                linkUrl={happening.linkUrl}
                imgUrl={happening.imgUrl}
                title={happening.title}
                view={happening.view}
                trending={happening.trending}
              />
            ))}
          </CardContainer>
          <CardContainer title="Who to follow">
            {followArray?.map((follow, i) => (
              <Follow
                key={i}
                imgUrl={follow.imgUrl}
                name={follow.name}
                id={follow.id}
              />
            ))}
          </CardContainer>
          <Info />
        </section>
      </div>
    </>
  );
};
