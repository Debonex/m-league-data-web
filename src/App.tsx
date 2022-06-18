import clsx from "clsx";
import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Navigator from "./components/Navigator";
import History from "./pages/History/History";
import LeaderBoard from "./pages/LeaderBoard";
import Pro from "./pages/Pro/Pro";
import Team from "./pages/Team";
import Teams from "./pages/Teams";

const App: FC = () => {
  return (
    <div
      className={clsx(
        "h-screen w-screen overflow-auto",
        "dark:bg-dark-main dark:text-white"
      )}
    >
      <Navigator className="sticky top-0 z-30" />
      <Routes>
        <Route path="*" element={<LeaderBoard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/team" element={<Team />} />
        <Route path="/leader-board" element={<LeaderBoard />} />
        <Route path="/history" element={<History />} />
        <Route path="/pro" element={<Pro />} />
      </Routes>
    </div>
  );
};

export default App;
