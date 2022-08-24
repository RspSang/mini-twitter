export default function SearchBar() {
  return (
    <div className="bg-gray-200 rounded-3xl flex px-3 py-2 focus-within:border-[#339DDB] focus-within:border-[1px] focus-within:bg-white focus-within:text-[#339DDB]">
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        placeholder="Search Twitter"
        className="bg-gray-200 rounded-r-3xl pl-2 focus:outline-none focus:bg-white focus:text-black"
      />
    </div>
  );
}
