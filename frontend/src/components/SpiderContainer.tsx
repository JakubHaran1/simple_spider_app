import Search from "./Search";
import SpiderList from "./SpiderList";

export default function SpiderContainer() {
  return (
    <div className="flex flex-col gap-8">
      <Search />
      <SpiderList />
    </div>
  );
}
