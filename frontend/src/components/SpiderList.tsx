import type { SetStateAction } from "react";
import type { SpiderType } from "../api/types";
import SpiderEl from "./SpiderEl";

type spiderProps = {
  spiders: SpiderType[];
  user: string;
  setIsOpenEdit: React.Dispatch<SetStateAction<boolean>>;
  setSpiderActive: React.Dispatch<SetStateAction<SpiderType>>;
  setReload: React.Dispatch<SetStateAction<number>>;
};

export default function SpiderList({
  spiders,
  user,
  setIsOpenEdit,
  setSpiderActive,
  setReload,
}: spiderProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-300">
          Spider List
        </h3>

        <ul className="space-y-3">
          {/* Element listy odzwierciedlający format: name | type | author */}
          {spiders.map((el) => (
            <SpiderEl
              key={el.id}
              spider={el}
              user={user}
              setIsOpenEdit={setIsOpenEdit}
              setSpiderActive={setSpiderActive}
              setReload={setReload}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
