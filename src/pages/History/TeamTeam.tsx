import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../../api";
import InnerLoading from "../../components/InnerLoading";
import Select, { SelectOption } from "../../components/Select";
import { useHistoryTable } from "./HistoryTable";
import useTeamInfo from "./TeamInfo";

const TeamTeam: FC<{
  chosenSeasons: number[];
  teamOptions: SelectOption[];
  optionsLoading: boolean;
}> = ({ chosenSeasons, teamOptions, optionsLoading }) => {
  const { t } = useTranslation();
  const [leftInfo, setLeftInfo] = useState<TeamInfo>();
  const [rightInfo, setRightInfo] = useState<TeamInfo>();
  const [infoLoading, setInfoLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [history, setHistory] = useState<GameHistory>();

  useEffect(() => {
    if (!leftInfo || !rightInfo) {
      return;
    }
    setHistoryLoading(true);
    api
      .post<GameHistory>("/game/history/team_team", {
        team_id: leftInfo.id,
        team_id2: rightInfo.id,
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

  const handleTeamChange = (teamId: number, isLeft: boolean) => {
    if (
      (isLeft && leftInfo?.id === teamId) ||
      (!isLeft && rightInfo?.id === teamId)
    ) {
      return;
    }
    setInfoLoading(true);
    api
      .get<TeamInfo>(`/team/info/${teamId}`)
      .then((res) => {
        setInfoLoading(false);
        if (res.status === 200) {
          if (isLeft) {
            setLeftInfo(res.data);
          } else {
            setRightInfo(res.data);
          }
        }
      })
      .catch(() => {
        setInfoLoading(false);
      });
  };

  return (
    <div>
      <div className="relative z-10 flex items-center">
        <Select
          options={teamOptions}
          className="flex-grow basis-0"
          placeholder={t("请选择队伍")}
          onChange={(teamId) => handleTeamChange(teamId as number, true)}
        />
        <div className="mx-2 select-none text-xl font-extrabold text-primary-main md:mx-4">
          VS
        </div>
        <Select
          options={teamOptions}
          className="flex-grow basis-0"
          placeholder={t("请选择队伍")}
          onChange={(teamId) => handleTeamChange(teamId as number, false)}
        />
        {optionsLoading && <InnerLoading />}
      </div>

      <div className="relative mt-3 flex flex-wrap">
        <div className="w-full flex-grow-0 basis-auto md:w-1/2">
          {useTeamInfo(leftInfo)}
        </div>
        <div className="mt-3 w-full flex-grow-0 basis-auto md:mt-0 md:w-1/2">
          {useTeamInfo(rightInfo)}
        </div>
        {infoLoading && <InnerLoading />}
      </div>

      <div className="relative mt-3">
        {useHistoryTable(history, leftInfo, rightInfo)}
        {historyLoading && <InnerLoading />}
      </div>
    </div>
  );
};

export default TeamTeam;
