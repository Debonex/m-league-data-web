import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import InnerLoading from "../components/InnerLoading";
import { teamAvatarUrl } from "../utils/format";

const Teams: FC = () => {
  const [teams, setTeams] = useState<TeamInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<TeamInfo[]>("/team/all")
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setTeams(res.data);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div
      className={clsx(
        "relative my-2 mx-auto grid max-w-1280 grid-cols-1 gap-4 rounded-lg border-2 p-2 md:my-4 md:grid-cols-2 md:p-4",
        "dark:border-dark-outstand dark:bg-dark-secondary"
      )}
    >
      {teams.map((team) => (
        <Link
          to={`/team?id=${team.id}`}
          key={team.id}
          className={clsx(
            "border p-2 transition-all hover:shadow-lg hover:shadow-dark-deep",
            "rounded-md dark:border-dark-outstand dark:bg-dark-outstand/50 dark:hover:border-primary-outstand"
          )}
        >
          <div className="text-center text-xl font-semibold">
            {team.team_name}
          </div>
          <img
            src={teamAvatarUrl(team.id)}
            className={clsx("mx-auto mt-2 h-40 w-40", {
              "py-2": team.id == 1,
              "p-2.5": team.id == 3,
            })}
          />
        </Link>
      ))}
      {loading && <InnerLoading />}
    </div>
  );
};

export default Teams;
