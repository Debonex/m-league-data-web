import clsx from "clsx";
import { FC } from "react";
import { Helmet } from "react-helmet";
import { Route, Routes } from "react-router-dom";
import Navigator from "./components/Navigator";
import History from "./pages/History/History";
import LeaderBoard from "./pages/LeaderBoard";
import Pro from "./pages/Pro/Pro";
import Team from "./pages/Team";
import Teams from "./pages/Teams";

const App: FC = () => {
  return (
    <>
      <Helmet>
        {import.meta.env.PROD && (
          <script
            async
            defer
            data-website-id="7e5d0c15-ef7c-499d-91b4-26dbbce151d4"
            src="https://umami.debonex.site/umami.js"
          />
        )}
      </Helmet>
      <div
        className={clsx(
          "grid h-screen w-screen grid-rows-[auto,minmax(0,1fr)]",
          "dark:bg-dark-main dark:text-white"
        )}
      >
        <Navigator className="sticky top-0 z-30" />
        <div className="w-full overflow-auto">
          <Routes>
            <Route path="*" element={<LeaderBoard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/team" element={<Team />} />
            <Route path="/leader-board" element={<LeaderBoard />} />
            <Route path="/history" element={<History />} />
            <Route path="/pro" element={<Pro />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
