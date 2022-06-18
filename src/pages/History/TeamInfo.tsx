import { useMemo } from "react";
import { teamAvatarUrl } from "../../utils/format";

const useTeamInfo = (teamInfo?: TeamInfo) =>
  useMemo(() => {
    return (
      teamInfo && (
        <div className="relative flex h-full flex-col items-center justify-center overflow-hidden">
          <img
            src={teamAvatarUrl(teamInfo.id)}
            className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 opacity-10 md:w-1/2"
          />
          <div className="relative mb-4 text-3xl font-bold md:text-5xl">
            {teamInfo.team_name}
          </div>
          <img src={teamAvatarUrl(teamInfo.id)} className="relative max-w-40" />
        </div>
      )
    );
  }, [teamInfo]);

export default useTeamInfo;
