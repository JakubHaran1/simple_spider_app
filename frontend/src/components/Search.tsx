export default function Search() {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 space-y-4">
      <div>
        <span className="block text-sm font-medium text-gray-400 mb-2">
          Search fields:
        </span>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center space-x-2 text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded text-emerald-600 bg-gray-700 border-gray-600 focus:ring-emerald-500 focus:ring-offset-gray-800"
            />
            <span>Author</span>
          </label>
          <label className="flex items-center space-x-2 text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded text-emerald-600 bg-gray-700 border-gray-600 focus:ring-emerald-500 focus:ring-offset-gray-800"
            />
            <span>Type</span>
          </label>
          <label className="flex items-center space-x-2 text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded text-emerald-600 bg-gray-700 border-gray-600 focus:ring-emerald-500 focus:ring-offset-gray-800"
            />
            <span>Tag</span>
          </label>
        </div>
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
