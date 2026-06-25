import type { SpiderType } from "../api/types";
import { SpiderService } from "../services/SpiderService";

type SpiderElProps = {
  spider: SpiderType;
  user: string;
  setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setSpiderActive: React.Dispatch<React.SetStateAction<SpiderType | null>>;
  setReload: React.Dispatch<React.SetStateAction<number>>;
};

export default function SpiderEl({
  spider,
  setIsOpenEdit,
  setSpiderActive,
  setReload,
  user,
}: SpiderElProps) {
  return (
    <li className="p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg border border-gray-600/50 transition duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="main-part  flex">
        <img
          className="w-25 mr-3"
          src={spider.spider_img_detail[0].img}
          alt=""
        />
        <div className="space-y-1">
          <div className="text-base font-semibold text-white">
            {spider.name}
            <span className="text-gray-400 font-normal">|</span>{" "}
            <span className="text-emerald-400 font-medium">{spider.type}</span>{" "}
            <span className="text-gray-400 font-normal">|</span>{" "}
            <span className="text-sm text-purple-400 font-mono">
              {spider.author.username}
            </span>
          </div>
          <p className="text-sm text-gray-400">{spider.description}</p>
          <div className="flex flex-wrap  gap-1.5 pt-1">
            {spider.tags_detail.map((el: { tag: string }) => (
              <span className="text-xs bg-gray-800 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                #{el.tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-500 self-end sm:self-center whitespace-nowrap">
        {spider.date_created}
        {user == spider.author.username && (
          <div className="edit-wrapper flex justify-around mt-2">
            <div
              className="edit cursor-pointer"
              onClick={() => {
                setIsOpenEdit(true);
                setSpiderActive(spider);
              }}
            >
              <i className="fa-solid fa-pen-to-square text-xl text-emerald-400"></i>
            </div>

            <div
              className="delete cursor-pointer"
              onClick={async () => {
                await SpiderService.deleteSpider(spider.id);
                setReload((prev) => prev + 1);
              }}
            >
              <i className="fa-solid fa-trash-can text-xl text-emerald-400"></i>
            </div>
          </div>
        )}
      </div>
    </li>
  );
}
