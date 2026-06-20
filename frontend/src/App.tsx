import "./App.css";
import SpiderContainer from "./components/SpiderContainer";
import CreateSpiderForm from "./components/CreateSpiderForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8">
        <SpiderContainer />
        <CreateSpiderForm />
      </div>
    </div>
  );
}

export default App;
