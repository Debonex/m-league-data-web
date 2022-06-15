import clsx from "clsx";
import { FC, useEffect, useMemo, useState } from "react";
import api from "../../api";
import InnerLoading from "../../components/InnerLoading";
import Select, { SelectOption } from "../../components/Select";
import useChoseSeasons from "../../hooks/useChoseSeasons";
import { useInfo } from "../Pro/Info";

const History: FC = () => {
  const {
    chosenSeasons,
    loading: seasonsLoading,
    Checkboxes: SeasonCheckboxes,
    CheckButtons: SeasonCheckButtons,
  } = useChoseSeasons();

  const [options, setOptions] = useState<SelectOption[]>([]);
  const [proListLoading, setProListLoading] = useState(true);

  const [leftInfo, setLeftInfo] = useState<ProInfo>();
  const [rightInfo, setRightInfo] = useState<ProInfo>();
  const [proInfoLoading, setProInfoLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [history, setHistory] = useState<GameHistory>();

  const handleProChange = (proId: number, isLeft: boolean) => {
    if (
      (isLeft && leftInfo?.id === proId) ||
      (!isLeft && rightInfo?.id === proId)
    ) {
      return;
    }
    setProInfoLoading(true);
    api
      .get<ProInfo>(`/pro/info/${proId}`)
      .then((res) => {
        setProInfoLoading(false);
        if (res.status === 200) {
          if (isLeft) {
            setLeftInfo(res.data);
          } else {
            setRightInfo(res.data);
          }
        }
      })
      .catch(() => {
        setProInfoLoading(false);
      });
  };

  // get pro select options
  useEffect(() => {
    api
      .get<ProInfo[]>("/pro/all")
      .then((res) => {
        setProListLoading(false);
        if (res.status === 200) {
          setOptions(
            res.data.map((pro) => ({
              label: pro.pro_name,
              value: pro.id,
            }))
          );
        }
      })
      .catch(() => {
        setProListLoading(false);
      });
  }, []);

  // when both right pro and left pro are chosen, fetch history
  useEffect(() => {
    if (!leftInfo || !rightInfo) {
      return;
    }
    setHistoryLoading(true);
    api
      .post<GameHistory>("/game/history/pro_pro", {
        pro_id: leftInfo.id,
        pro_id2: rightInfo.id,
        seasons: chosenSeasons,
      })
      .then((res) => {
        setHistoryLoading(false);
        if (res.status === 200) {
          setHistory(res.data);
        }
      })
      .catch(() => {
        setHistoryLoading(false);
      });
  }, [leftInfo, rightInfo, chosenSeasons]);

  const SeasonFilter = useMemo(
    () => (
      <div
        className={clsx(
          "relative mb-4 rounded-lg border-2 p-3",
          "dark:border-dark-outstand dark:bg-dark-secondary"
        )}
      >
        {SeasonCheckboxes}
        {SeasonCheckButtons}
        {seasonsLoading && <InnerLoading />}
      </div>
    ),
    [chosenSeasons, seasonsLoading]
  );

  return (
    <div className="mx-auto max-w-1920 p-4">
      {SeasonFilter}
      <div
        className={clsx(
          "rounded-lg border-2 p-3",
          "dark:border-dark-outstand dark:bg-dark-secondary"
        )}
      >
        <div className="relative z-10 flex items-center">
          <Select
            options={options}
            className="flex-grow basis-0"
            placeholder="请选择选手"
            onChange={(proId) => handleProChange(proId, true)}
          />
          <div className="mx-2 select-none text-xl font-extrabold text-primary-main md:mx-4">
            VS
          </div>
          <Select
            options={options}
            className="flex-grow basis-0"
            placeholder="请选择选手"
            onChange={(proId) => handleProChange(proId, false)}
          />
          {proListLoading && <InnerLoading />}
        </div>

        <div className="relative mt-3 flex">
          <div className="flex-grow basis-0">{useInfo(leftInfo)}</div>
          <div className="flex-grow basis-0">{useInfo(rightInfo, true)}</div>
          {proInfoLoading && <InnerLoading />}
        </div>

        <div className="relative mt-3">
          {history ? history.point : 0.0}
          {history &&
            history.games.map((game) => (
              <div className="flex">
                <div>{game.season_id}</div>
                <div>{game.time}</div>
                {game.pros.map((pro) => (
                  <div>
                    {pro.pro_name}:{pro.point}
                  </div>
                ))}
              </div>
            ))}
          {historyLoading && <InnerLoading />}
        </div>
      </div>
    </div>
  );
};

export default History;
