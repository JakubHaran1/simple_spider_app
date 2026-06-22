import { SpiderService } from "../services/SpiderService";
import type { SpiderType } from "../api/types";
import Search from "./Search";
import SpiderList from "./SpiderList";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LoginPopUp from "./LoginPopUp";

export default function SpiderContainer() {
  const [spiders, setSpiders] = useState<SpiderType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    SpiderService.getSpiders().then((resp) => {
      setSpiders([...resp]);
      console.log(resp);
    });
  }, []);

  const handleSearch = (query: string) => {
    if (!query) return;
    const search = query.trim();
    console.log(search);
    SpiderService.searchSpiders(search).then((resp) => {
      setSpiders([...resp]);
      console.log(resp);
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <button
          type="button"
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition duration-200 shadow-md shadow-emerald-900/20"
          onClick={() => setIsOpen(true)}
        >
          Sign In
        </button>
      </div>

      <Search handleSearch={handleSearch} />
      <SpiderList spiders={spiders} />
      {createPortal(
        <LoginPopUp isOpen={isOpen} setIsOpen={setIsOpen} />,
        document.body,
      )}
    </div>
  );
}
