import Button from "components/Button";
import Checkbox from "components/Checkbox";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "utils/api";

const useChooseTeams = () => {
  const { t } = useTranslation();
  const [teams, setTeams] = useState<TeamInfo[]>([]);
  const [chosenTeams, setChosenTeams] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<TeamInfo[]>("/team/all")
      .then((res) => {
        if (res.status === 200) {
          setTeams(res.data);
          setChosenTeams(res.data.map((item) => item.id));
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleCheckTeam = (teamId: number, checked: boolean) => {
    if (checked) {
      setChosenTeams([...chosenTeams, teamId]);
    } else {
      setChosenTeams(chosenTeams.filter((id) => id !== teamId));
    }
  };

  const ChecksBlock = (
    <>
      <div className="flex flex-wrap">
        {teams.map((team) => (
          <Checkbox
            key={team.id}
            value={team.id}
            onChange={(checked) => handleCheckTeam(team.id, checked)}
            checked={chosenTeams.includes(team.id)}
            label={team.team_name}
          />
        ))}
      </div>
      <div className="flex">
        <Button
          onClick={() => {
            setChosenTeams(teams.map((team) => team.id));
          }}
          className="mr-2"
        >
          {t("全选")}
        </Button>

        <Button
          onClick={() => {
            setChosenTeams([]);
          }}
        >
          {t("清空")}
        </Button>
      </div>
    </>
  );

  return {
    chosenTeams,
    loading,
    ChecksBlock,
  };
};

export default useChooseTeams;
