import { SpiderService } from "../api/services/SpiderService";
import type { SpiderType } from "../api/types";
import Search from "./Search";
import SpiderList from "./SpiderList";
import { useEffect, useState } from "react";

export default function SpiderContainer() {
  const [spiders, setSpiders] = useState<SpiderType[]>([]);
  useEffect(() => {
    SpiderService.getSpiders().then((resp) => {
      setSpiders([...resp]);
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
      <Search handleSearch={handleSearch} />
      <SpiderList spiders={spiders} />
    </div>
  );
}
