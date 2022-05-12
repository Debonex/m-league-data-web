import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import LeaderBoard from "./pages/LeaderBoard";
import Teams from "./pages/Teams";
import Navigator from "./components/Navigator";
import clsx from "clsx";

const App: FC = () => {
  return (
    <div
      className={clsx([
        "h-screen w-screen overflow-auto",
        "dark:bg-dark-main dark:text-white-main",
      ])}
    >
      <Navigator className="sticky top-0" />
      <Routes>
        <Route path="*" element={<Teams />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leader-board" element={<LeaderBoard />} />
      </Routes>
    </div>
  );
};

export default App;
