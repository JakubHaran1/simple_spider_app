import { useState } from "react";
import type { SpiderTypeCreate } from "../api/types";

export default function CreateSpiderForm() {
  const [newSpider, setNewSpider] = useState<SpiderTypeCreate>({
    id: -1,
    name: "",
    type: "",
    description: "",
    tags: "",
  });

  const handleCreateSpider = <K extends keyof SpiderTypeCreate>(
    e: React.ChangeEvent<HTMLInputElement>,
    name: K,
  ) => {
    const val = e.target.value;
    setNewSpider((prev) => ({ ...prev, [name]: val }));
  };

  return (
    <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 h-fit">
      <h2 className="text-xl font-bold mb-6 text-emerald-400 flex items-center gap-2">
        🕷️ Add New Spider
      </h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="e.g. Gooty Sapphire"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
            required
            onChange={(e) => handleCreateSpider(e, "name")}
            value={newSpider.name}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Type
          </label>
          <input
            type="text"
            placeholder="e.g. Tarantula"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
            required
            onChange={(e) => handleCreateSpider(e, "type")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Description
          </label>
          <textarea
            placeholder="Short description..."
            maxLength={250}
            rows={3}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 text-white resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            placeholder="e.g. fast, arboreal, blue"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
            onChange={(e) => handleCreateSpider(e, "tags")}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-md"
        >
          Create Spider
        </button>
      </form>
    </div>
  );
}
