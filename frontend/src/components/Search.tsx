export default function Search() {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 space-y-4">
      <div>
        <span className="block text-sm font-medium text-gray-400 mb-2">
          You can search on
        </span>
        <ul className="flex flex-wrap gap-4">
          <li className="flex items-center space-x-2 text-sm ">
            <span>1. Author</span>
          </li>
          <li className="flex items-center space-x-2 text-sm ">
            <span>2. Type</span>
          </li>
          <li className="flex items-center space-x-2 text-sm ">
            <span>3. Tag</span>
          </li>
        </ul>
      </div>

      {/* Wyszukiwarka (Input + Button) */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search spiders..."
          className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
        />
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg font-medium transition duration-200">
          Search
        </button>
      </div>
    </div>
  );
}
