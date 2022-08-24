interface MenuContainerProps {
  title: string;
  children: JSX.Element;
}

export default function MenuContainer({ title, children }: MenuContainerProps) {
  return (
    <div className="flex items-center hover:bg-gray-300 hover:bg-opacity-40 hover:transition-opacity hover:cursor-pointer py-1 px-2 rounded-3xl">
      {children}
      <span className="font-bold">{title}</span>
    </div>
  );
}
