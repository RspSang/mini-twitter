import Link from "next/link";

interface HappeningProps {
  trending: string;
  title: string;
  view: string;
  imgUrl: string;
  linkUrl: string;
}

export default function Happening({
  trending,
  title,
  view,
  imgUrl,
  linkUrl,
}: HappeningProps) {
  return (
    <Link href={linkUrl}>
      <a>
        <div className="flex py-2 items-center justify-between">
          <div>
            <div className="text-xs text-gray-600">{trending} Trending</div>
            <div className="text-sm font-bold py-1">{title}</div>
            <div className="text-xs text-gray-600">{view} Tweets</div>
          </div>
          <img
            className="rounded-2xl  aspect-square w-16 h-16 bg-cover"
            src={imgUrl}
          />
        </div>
      </a>
    </Link>
  );
}
