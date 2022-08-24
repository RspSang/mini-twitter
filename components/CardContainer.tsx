interface CardContainerProps {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export default function CardContainer({ title, children }: CardContainerProps) {
  return (
    <div className="bg-gray-200 rounded-2xl px-4 py-3">
      <div className="text-xl font-bold">{title}</div>
      {children}
    </div>
  );
}
