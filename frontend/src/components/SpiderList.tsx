import { useEffect, useState } from "react";
import { SpiderService } from "../api/services/SpiderService";
import type { SpiderType } from "../api/types";
import SpiderEl from "./SpiderEl";
export default function SpiderList() {
  const [spiders, setSpiders] = useState<SpiderType[]>([]);
  useEffect(() => {
    SpiderService.getSpiders().then((resp) => setSpiders([...resp]));
  }, []);
  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-300">
          Spider List
        </h3>

        <ul className="space-y-3">
          {/* Element listy odzwierciedlający format: name | type | author */}
          {spiders.map((el) => (
            <SpiderEl spider={el} />
          ))}

          {/* Drugi przykładowy element listy */}
          <li className="p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg border border-gray-600/50 transition duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-base font-semibold text-white">
                Latrodectus mactans{" "}
                <span className="text-gray-400 font-normal">|</span>{" "}
                <span className="text-emerald-400 font-medium">
                  Black Widow
                </span>{" "}
                <span className="text-gray-400 font-normal">|</span>{" "}
                <span className="text-sm text-purple-400 font-mono">
                  @user1
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Highly venomous spider with a red hourglass mark.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-xs bg-gray-800 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                  #dangerous
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-500 self-end sm:self-center whitespace-nowrap">
              2026-06-19
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
