import { useEffect, useState } from "react";
import { SpiderService } from "../api/services/SpiderService";
import type { SpiderType } from "../api/types";
import SpiderEl from "./SpiderEl";
export default function SpiderList() {
  const [spiders, setSpiders] = useState<SpiderType[]>([]);
  useEffect(() => {
    SpiderService.getSpiders().then((resp) => {
      setSpiders([...resp]);
      console.log(...resp);
    });
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
        </ul>
      </div>
    </div>
  );
}
