import type { SpiderType } from "../api/types";

type SpiderElProps = {
  spider: SpiderType;
};

export default function SpiderEl({ spider }: SpiderElProps) {
  return (
    <li className="p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg border border-gray-600/50 transition duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
        <div className="flex flex-wrap gap-1.5 pt-1">
          {spider.tag.map((el) => (
            <span className="text-xs bg-gray-800 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
              #{el.tag}
            </span>
          ))}
        </div>
      </div>
      <div className="text-xs text-gray-500 self-end sm:self-center whitespace-nowrap">
        {spider.date_created}
      </div>
    </li>
  );
}
