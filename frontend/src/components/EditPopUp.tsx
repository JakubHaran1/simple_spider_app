import { useState, type SetStateAction } from "react";
import type { SpiderType, SpiderTypeCreate } from "../api/types";
import { SpiderService } from "../services/SpiderService";

type EditPopUpProps = {
  isOpenEdit: boolean;
  setIsOpenEdit: React.Dispatch<SetStateAction<boolean>>;
  spider: SpiderType | null;
  setReload: React.Dispatch<SetStateAction<number>>;
};

export default function EditPopUp({
  isOpenEdit,
  setIsOpenEdit,
  spider,
  setReload,
}: EditPopUpProps) {
  const createSpiderDraft = (
    spider: SpiderType | null,
  ): SpiderTypeCreate | null => {
    if (spider) {
      return {
        id: spider.id,
        name: spider.name,
        type: spider.type,
        spider_img: { img: null },
        description: spider.description,
        tags: spider.tags_detail.map((el) => el.tag).join(", "),
      };
    }
    return null;
  };
  const [newSpider, setNewSpider] = useState<SpiderTypeCreate | null>(() => {
    return createSpiderDraft(spider);
  });
  const [errors, setErrors] = useState<string>("");
  const handleEditForm = <K extends keyof SpiderTypeCreate>(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: K,
  ) => {
    const val = e.target.value;
    setNewSpider((prev) => {
      if (!prev) return prev;
      return { ...prev, [name]: val };
    });
  };

  const handleCreateSpider = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!newSpider || !spider?.id) return new Error();
      await SpiderService.updateSpider(newSpider, spider.id);

      setErrors("");
      setReload((prev) => prev + 1);
      setIsOpenEdit(false);
      setNewSpider(null);
    } catch {
      setErrors("Something goes wrong");
    }
  };

  if (!isOpenEdit || !spider || !newSpider) return "";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

      <div className="relative w-full max-w-lg bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-6 md:p-8">
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition duration-150"
          aria-label="Close modal"
          onClick={() => setIsOpenEdit(false)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Nagłówek modala */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            ✏️ Edit Spider Details
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Modifying object:{" "}
            <span className="text-emerald-400 font-mono">ID {spider.id}</span>
          </p>
        </div>
        {errors ? <p className="text-sm text-red-400">{errors}</p> : ""}
        {/* Formularz edycji */}
        <form className="space-y-4" onSubmit={handleCreateSpider}>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Name
            </label>
            <input
              onChange={(e) => handleEditForm(e, "name")}
              type="text"
              value={newSpider.name}
              placeholder={spider.name}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 text-white transition duration-150"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Type
            </label>
            <input
              onChange={(e) => handleEditForm(e, "type")}
              type="text"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 text-white transition duration-150"
              required
              placeholder={spider.type}
              value={newSpider.type}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Description
            </label>
            <textarea
              onChange={(e) => handleEditForm(e, "description")}
              value={newSpider.description}
              placeholder={spider.description}
              maxLength={250}
              rows={4}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 text-white resize-none transition duration-150"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Tags (comma separated)
            </label>
            <input
              onChange={(e) => handleEditForm(e, "tags")}
              type="text"
              value={newSpider.tags}
              placeholder={spider.tags_detail.map((el) => el.tag).join(", ")}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 text-white transition duration-150"
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
                if (e.target.files && e.target.files.length > 0)
                  setNewSpider((prev) => {
                    if (!prev) return prev;
                    return {
                      ...prev,
                      spider_img: { img: e.target.files![0] },
                    };
                  });
              }}
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition duration-150 shadow-md shadow-emerald-900/10"
          >
            Save Changes
          </button>
        </form>
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-700/60 mt-6">
          <button
            onClick={() => {
              setNewSpider(createSpiderDraft(spider));
              setIsOpenEdit(false);
              setErrors("");
            }}
            type="button"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium rounded-lg transition duration-150"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
