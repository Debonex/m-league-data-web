import clsx from "clsx";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { formatPoint } from "../../utils/format";

const useHistoryTable = (
  history?: GameHistory,
  leftInfo?: ProInfo | TeamInfo,
  rightInfo?: ProInfo | TeamInfo
) => {
  const HistoryTable = useMemo(() => {
    let [winWidth, loseWidth] = ["0%", "0%"];
    if (leftInfo && rightInfo && history) {
      const [winCount, drawCount, loseCount] = vsCount(
        history.games,
        leftInfo,
        rightInfo
      );
      const total = winCount + drawCount + loseCount;
      if (total !== 0) {
        winWidth = `${(winCount / total) * 100}%`;
        loseWidth = `${(loseCount / total) * 100}%`;
      }
    }
    return (
      <div>
        <div className="text-center text-xl font-bold">
          {formatPoint(history ? history.point : 0.0)}
        </div>
        <div className="mt-3 flex h-2 w-full">
          <div
            className="rounded-l-md bg-primary-main transition-all duration-500"
            style={{ width: winWidth }}
          />
          <div
            className={clsx("flex-grow bg-silver transition-all duration-500", {
              "rounded-l-md": winWidth === "0%",
              "rounded-r-md": loseWidth === "0%",
            })}
          />
          <div
            className="rounded-r-md bg-secondary-main transition-all duration-500"
            style={{ width: loseWidth }}
          />
        </div>

        {/* table on pc */}
        <div className="mt-3 hidden md:block">
          <div
            className={clsx(
              "flex rounded-lg py-0.5 font-bold",
              "dark:bg-dark-outstand/75"
            )}
          >
            <div className="flex-grow basis-0 text-center">赛季</div>
            <div className="flex-grow basis-0 text-center">日期</div>
            <div className="flex-grow basis-0 text-center">东起</div>
            <div className="flex-grow basis-0 text-center">南起</div>
            <div className="flex-grow basis-0 text-center">西起</div>
            <div className="flex-grow basis-0 text-center">北起</div>
          </div>
          {history &&
            history.games.map((game) => {
              const gameResult = vsCount([game], leftInfo, rightInfo);
              return (
                <div
                  className={clsx(
                    "mt-1 flex rounded-l-lg bg-gradient-to-r py-0.5 dark:to-dark-secondary",
                    {
                      "from-primary-main/10": gameResult[0],
                      "from-silver/10": gameResult[1],
                      "from-secondary-main/10": gameResult[2],
                    }
                  )}
                  key={game.id}
                >
                  <div className="flex-grow basis-0 text-center">
                    {game.season_name}
                  </div>
                  <div className="flex-grow basis-0 text-center">
                    {game.time.substring(0, 10)}
                  </div>
                  {game.pros.map((pro, idx) => {
                    const leftMatch = sameId(pro, leftInfo);
                    const rightMatch = sameId(pro, rightInfo);
                    return (
                      <Link
                        to={`/pro?id=${pro.id}`}
                        className={clsx(
                          "flex-grow basis-0 text-center transition-colors dark:hover:text-white",
                          {
                            "font-bold": leftMatch || rightMatch,
                            "dark:text-white/50": !leftMatch && !rightMatch,
                            "text-primary-main": leftMatch,
                            "text-secondary-main": rightMatch,
                          }
                        )}
                        key={idx}
                      >
                        {`${pro.pro_name} ${formatPoint(pro.point)}`}
                      </Link>
                    );
                  })}
                </div>
              );
            })}
        </div>

        {/* table on mobile */}
        <div className="mt-3 grid grid-cols-1 gap-2 md:hidden">
          {history &&
            history.games.map((game) => {
              const gameResult = vsCount([game], leftInfo, rightInfo);
              return (
                <div
                  className={clsx("rounded-md p-3 text-sm", {
                    "bg-primary-main/10": gameResult[0],
                    "bg-silver/10": gameResult[1],
                    "bg-secondary-main/10": gameResult[2],
                  })}
                  key={game.id}
                >
                  <div className="w-1/2 flex-grow-0 basis-auto">
                    赛季：{game.season_name}
                  </div>
                  <div className="w-1/2 flex-grow-0 basis-auto">
                    日期：{game.time.substring(0, 10)}
                  </div>
                  <div className="flex flex-wrap">
                    {game.pros.map((pro, idx) => {
                      const leftMatch = sameId(pro, leftInfo);
                      const rightMatch = sameId(pro, rightInfo);
                      return (
                        <Link
                          to={`/pro?id=${pro.id}`}
                          className={clsx(
                            "w-1/2 flex-grow-0 basis-auto transition-colors dark:hover:text-white",
                            {
                              "font-bold": leftMatch || rightMatch,
                              "dark:text-white/50": !leftMatch && !rightMatch,
                              "text-primary-main": leftMatch,
                              "text-secondary-main": rightMatch,
                            }
                          )}
                          key={idx}
                        >
                          {`${pro.pro_name} ${formatPoint(pro.point)}`}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }, [history]);

  return HistoryTable;
};

const vsCount = (
  games: Game[],
  leftInfo?: ProInfo | TeamInfo,
  rightInfo?: ProInfo | TeamInfo
) => {
  if (!leftInfo || !rightInfo) {
    return [0, 0, 0];
  }
  let winCount = 0;
  let drawCount = 0;
  let loseCount = 0;
  games.forEach((game) => {
    const pro = game.pros.find((pro) => sameId(pro, leftInfo));
    const pro2 = game.pros.find((pro) => sameId(pro, rightInfo));
    if (pro && pro2) {
      if (pro.point > pro2.point) {
        winCount++;
      } else if (pro.point < pro2.point) {
        loseCount++;
      } else {
        drawCount++;
      }
    }
  });
  return [winCount, drawCount, loseCount];
};

const sameId = (pro: GamePro, info?: ProInfo | TeamInfo) => {
  if (!info) {
    return false;
  }
  return pro["team_name" in info ? "team_id" : "id"] === info.id;
};

export { useHistoryTable };
