import "./App.css";
import SpiderContainer from "./components/SpiderContainer";
import CreateSpiderForm from "./components/CreateSpiderForm";
import { useState } from "react";
function App() {
  const [reload, setReload] = useState(0);
  const [user, setUser] = useState("");
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8">
        <SpiderContainer
          reload={reload}
          user={user}
          setUser={setUser}
          setReload={setReload}
        />
        <CreateSpiderForm user={user} setUser={setUser} setReload={setReload} />
      </div>
    </div>
  );
}

export default App;
