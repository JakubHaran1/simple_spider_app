import { useState } from "react";
import type { SpiderTypeCreate } from "../api/types";
import { SpiderService } from "../services/SpiderService";
import { isAxiosError } from "axios";
type CreateSpiderProps = {
  setReload: React.Dispatch<React.SetStateAction<number>>;
};

export default function CreateSpiderForm({ setReload }: CreateSpiderProps) {
  const spiderDraft = {
    name: "",
    type: "",
    spider_img: { img: null },
    description: "",
    tags: "",
  };
  const [newSpider, setNewSpider] = useState<SpiderTypeCreate>({
    name: "",
    type: "",
    spider_img: { img: null },
    description: "",
    tags: "",
  });

  const handleEditForm = <K extends keyof SpiderTypeCreate>(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: K,
  ) => {
    const val = e.target.value;
    setNewSpider((prev) => ({ ...prev, [name]: val }));
  };

  const handleCreateSpider = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await SpiderService.createSpider(newSpider);
      setReload((prev) => prev + 1);
      setNewSpider(spiderDraft);
    } catch (err) {
      if (isAxiosError(err)) console.log(err.response?.data.detail);
    }
  };

  return (
    <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 h-fit">
      <h2 className="text-xl font-bold mb-6 text-emerald-400 flex items-center gap-2">
        🕷️ Add New Spider
      </h2>
      <form
        encType="multipart/form-data"
        className="space-y-4"
        onSubmit={async (e) => await handleCreateSpider(e)}
      >
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="e.g. Gooty Sapphire"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
            required
            onChange={(e) => handleEditForm(e, "name")}
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
            onChange={(e) => handleEditForm(e, "type")}
            value={newSpider.type}
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
            value={newSpider.description}
            onChange={(e) => handleEditForm(e, "description")}
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
            onChange={(e) => handleEditForm(e, "tags")}
            value={newSpider.tags}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Photo of your spider
          </label>
          <input
            type="file"
            id="spider-image"
            name="image"
            accept="image/*"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-gray-300 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 file:transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => {
              if (e.target.files && e.target.files.length >= 0)
                setNewSpider((prev) => ({
                  ...prev,
                  spider_img: { img: e.target.files![0] },
                }));
            }}
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
