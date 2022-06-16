import { FC, useEffect, useState } from "react";
import api from "../../api";
import InnerLoading from "../../components/InnerLoading";
import Select, { SelectOption } from "../../components/Select";
import { teamAvatarUrl } from "../../utils/format";
import { useProInfo } from "../Pro/Info";

const ProTeam: FC<{
  chosenSeasons: number[];
  proOptions: SelectOption[];
  teamOptions: SelectOption[];
  optionsLoading: boolean;
}> = ({ chosenSeasons, proOptions, teamOptions, optionsLoading }) => {
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
          placeholder="请选择选手"
          onChange={(proId) => handleProChange(proId)}
        />
        <div className="mx-2 select-none text-xl font-extrabold text-primary-main md:mx-4">
          VS
        </div>
        <Select
          options={teamOptions}
          className="flex-grow basis-0"
          placeholder="请选择队伍"
          onChange={(teamId) => handleTeamChange(teamId)}
        />
        {optionsLoading && <InnerLoading />}
      </div>

      <div className="relative mt-3 flex flex-wrap">
        <div className="w-full flex-grow-0 basis-auto md:w-1/2">
          {useProInfo(proInfo)}
        </div>
        <div className="w-full flex-grow-0 basis-auto md:w-1/2">
          {teamInfo && (
            <div className="relative flex h-full flex-col items-center justify-center overflow-hidden">
              <img
                src={teamAvatarUrl(teamInfo.id)}
                className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 opacity-10 md:w-1/2"
              />
              <div className="relative mb-4 text-3xl font-bold md:text-5xl">
                {teamInfo.team_name}
              </div>
              <img
                src={teamAvatarUrl(teamInfo.id)}
                className="relative max-w-40"
              />
            </div>
          )}
        </div>
        {infoLoading && <InnerLoading />}
      </div>
    </div>
  );
};

export default ProTeam;
