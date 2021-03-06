import clsx from "clsx";
import { FC, useEffect, useMemo, useState } from "react";
import api from "../../api";
import Button from "../../components/Button";
import InnerLoading from "../../components/InnerLoading";
import { SelectOption } from "../../components/Select";
import useChoseSeasons from "../../hooks/useChoseSeasons";
import ProPro from "./ProPro";
import ProTeam from "./ProTeam";
import TeamTeam from "./TeamTeam";

const History: FC = () => {
  const {
    chosenSeasons,
    loading: seasonsLoading,
    Checkboxes: SeasonCheckboxes,
    CheckButtons: SeasonCheckButtons,
  } = useChoseSeasons();

  const [options, setOptions] = useState<{
    pro: SelectOption[];
    team: SelectOption[];
  }>({ pro: [], team: [] });
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [between, setBetween] = useState<"pro_pro" | "pro_team" | "team_team">(
    "pro_pro"
  );

  // get pro and team options
  useEffect(() => {
    Promise.all([
      api.get<ProInfo[]>("/pro/all"),
      api.get<TeamInfo[]>("/team/all"),
    ])
      .then((results) => {
        setOptionsLoading(false);
        if (results[0].status === 200 && results[1].status === 200) {
          setOptions({
            pro: results[0].data.map((pro) => ({
              label: pro.pro_name,
              value: pro.id,
            })),
            team: results[1].data.map((team) => ({
              label: team.team_name,
              value: team.id,
            })),
          });
        }
      })
      .catch(() => {
        setOptionsLoading(false);
      });
  }, []);

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
          "mb-4 flex rounded-lg border-2 p-3",
          "dark:border-dark-outstand dark:bg-dark-secondary"
        )}
      >
        <Button
          flat
          outline
          onClick={() => setBetween("pro_pro")}
          active={between === "pro_pro"}
          className="rounded-l-md"
        >
          ?????????
        </Button>
        <Button
          flat
          outline
          onClick={() => setBetween("pro_team")}
          active={between === "pro_team"}
        >
          ??????????????????
        </Button>
        <Button
          flat
          outline
          onClick={() => setBetween("team_team")}
          active={between === "team_team"}
          className="rounded-r-md"
        >
          ?????????
        </Button>
      </div>

      <div
        className={clsx(
          "rounded-lg border-2 p-3",
          "dark:border-dark-outstand dark:bg-dark-secondary"
        )}
      >
        {between == "pro_pro" && (
          <ProPro
            chosenSeasons={chosenSeasons}
            optionsLoading={optionsLoading}
            proOptions={options.pro}
          />
        )}
        {between == "pro_team" && (
          <ProTeam
            chosenSeasons={chosenSeasons}
            optionsLoading={optionsLoading}
            proOptions={options.pro}
            teamOptions={options.team}
          />
        )}
        {between == "team_team" && (
          <TeamTeam
            chosenSeasons={chosenSeasons}
            optionsLoading={optionsLoading}
            teamOptions={options.team}
          />
        )}
      </div>
    </div>
  );
};

export default History;
