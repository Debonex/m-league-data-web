import InnerLoading from "components/InnerLoading";
import Select, { SelectOption } from "components/Select";
import ProInfo from "pages/Pro/Info";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "utils/api";
import { useHistoryTable } from "./HistoryTable";
import useTeamInfo from "./TeamInfo";

const ProTeam: FC<{
  chosenSeasons: number[];
  proOptions: SelectOption[];
  teamOptions: SelectOption[];
  optionsLoading: boolean;
}> = ({ chosenSeasons, proOptions, teamOptions, optionsLoading }) => {
  const { t } = useTranslation();
  const [proInfo, setProInfo] = useState<ProInfo>();
  const [teamInfo, setTeamInfo] = useState<TeamInfo>();
  const [infoLoading, setInfoLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [history, setHistory] = useState<GameHistory>();

  // when both pro and team are chosen, fetch history
  useEffect(() => {
    if (!proInfo || !teamInfo) {
      return;
    }
    setHistoryLoading(true);
    api
      .post<GameHistory>("/game/history/pro_team", {
        pro_id: proInfo.id,
        team_id: teamInfo.id,
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
  }, [proInfo, teamInfo, chosenSeasons]);

  const handleProChange = (proId: number) => {
    if (proId === proInfo?.id) {
      return;
    }
    setInfoLoading(true);
    api
      .get<ProInfo>(`/pro/info/${proId}`)
      .then((res) => {
        setInfoLoading(false);
        if (res.status === 200) {
          setProInfo(res.data);
        }
      })
      .catch(() => {
        setInfoLoading(false);
      });
  };

  const handleTeamChange = (teamId: number) => {
    if (teamId === teamInfo?.id) {
      return;
    }
    setInfoLoading(true);
    api
      .get<TeamInfo>(`/team/info/${teamId}`)
      .then((res) => {
        setInfoLoading(false);
        if (res.status === 200) {
          setTeamInfo(res.data);
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
          options={proOptions}
          className="flex-grow basis-0"
          placeholder={t("请选择选手")}
          onChange={(proId) => handleProChange(proId as number)}
        />
        <div className="mx-2 select-none text-xl font-extrabold text-primary-main md:mx-4">
          VS
        </div>
        <Select
          options={teamOptions}
          className="flex-grow basis-0"
          placeholder={t("请选择队伍")}
          onChange={(teamId) => handleTeamChange(teamId as number)}
        />
        {optionsLoading && <InnerLoading />}
      </div>

      <div className="relative mt-3 flex flex-wrap">
        <div className="w-full flex-grow-0 basis-auto md:w-1/2">
          <ProInfo info={proInfo} />
        </div>
        <div className="mt-3 w-full flex-grow-0 basis-auto md:mt-0 md:w-1/2">
          {useTeamInfo(teamInfo)}
        </div>
        {infoLoading && <InnerLoading />}
      </div>

      <div className="relative mt-3">
        {useHistoryTable(history, proInfo, teamInfo)}
        {historyLoading && <InnerLoading />}
      </div>
    </div>
  );
};

export default ProTeam;
