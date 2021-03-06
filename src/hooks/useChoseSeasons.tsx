import { useState, useEffect } from "react";
import api from "../api";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";

const useChoseSeasons = () => {
  const [seasons, setSeasons] = useState<SeasonInfo[]>([]);
  const [chosenSeasons, setChosenSeasons] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<SeasonInfo[]>("/season/all")
      .then((res) => {
        if (res.status === 200) {
          setSeasons(res.data);
          setChosenSeasons(res.data.map((s) => s.id));
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSeasonChange = (targetId: number, checked: boolean) => {
    if (checked) {
      setChosenSeasons([...chosenSeasons, targetId]);
    } else {
      setChosenSeasons(chosenSeasons.filter((id) => id !== targetId));
    }
  };

  return {
    chosenSeasons,
    loading,
    Checkboxes: (
      <div className="flex flex-wrap">
        {seasons.map((season) => (
          <Checkbox
            key={season.id}
            value={season.id}
            onChange={(checked) => handleSeasonChange(season.id, checked)}
            checked={chosenSeasons.includes(season.id)}
            label={season.season_name.replace("赛季", "")}
          />
        ))}
      </div>
    ),
    CheckButtons: (
      <div className="flex">
        <Button
          onClick={() => {
            setChosenSeasons(seasons.map((season) => season.id));
          }}
          className="mr-2"
        >
          全选
        </Button>

        <Button
          onClick={() => {
            setChosenSeasons([]);
          }}
        >
          清空
        </Button>
      </div>
    ),
  };
};

export default useChoseSeasons;
