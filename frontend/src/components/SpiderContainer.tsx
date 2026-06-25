import { SpiderService } from "../services/SpiderService";
import type { SpiderType } from "../api/types";
import Search from "./Search";
import SpiderList from "./SpiderList";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LoginPopUp from "./LoginPopUp";
import EditPopUp from "./EditPopUp";

type SpiderContainerProps = {
  reload: number;
  setReload: React.Dispatch<React.SetStateAction<number>>;
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
};
export default function SpiderContainer({
  reload,
  setReload,
  user,
  setUser,
}: SpiderContainerProps) {
  const [spiders, setSpiders] = useState<SpiderType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [spiderActive, setSpiderActive] = useState<SpiderType | null>(null);

  useEffect(() => {
    SpiderService.getSpiders().then((resp) => {
      setSpiders(() => [...resp]);
    });
  }, [reload]);

  const handleSearch = (query: string) => {
    if (!query) return;
    const search = query.trim();
    console.log(search);
    SpiderService.searchSpiders(search).then((resp) => {
      setSpiders([...resp]);
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        {!user ? (
          <button
            type="button"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition duration-200 shadow-md shadow-emerald-900/20"
            onClick={() => setIsOpen(true)}
          >
            Sign In
          </button>
        ) : (
          ""
        )}

        {user ? (
          <button
            type="button"
            className="px-5 ml-4 py-2.5 bg-red-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition duration-200 shadow-md shadow-emerald-900/20"
            onClick={() => {
              setUser("");
              localStorage.clear();
            }}
          >
            Sign out {user}
          </button>
        ) : (
          ""
        )}
      </div>

      <Search handleSearch={handleSearch} />
      <SpiderList
        spiders={spiders}
        user={user}
        setIsOpenEdit={setIsOpenEdit}
        setSpiderActive={setSpiderActive}
        setReload={setReload}
      />
      {createPortal(
        <LoginPopUp isOpen={isOpen} setIsOpen={setIsOpen} setUser={setUser} />,
        document.body,
      )}
      {isOpenEdit && spiderActive ? (
        <EditPopUp
          isOpenEdit={isOpenEdit}
          setIsOpenEdit={setIsOpenEdit}
          spider={spiderActive}
          setReload={setReload}
        />
      ) : (
        ""
      )}
    </div>
  );
}
