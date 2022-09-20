import Button from "components/Button";
import Checkbox from "components/Checkbox";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "utils/api";

const useChoseSeasons = () => {
  const [seasons, setSeasons] = useState<SeasonInfo[]>([]);
  const [chosenSeasons, setChosenSeasons] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

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

  const label = useCallback(
    (seasonName: string) => {
      const match = seasonName.replace("赛季", "").match(/(\d+)(.+)/);
      if (!match) {
        return "";
      }
      return `${match[1]}${t(match[2])}`;
    },
    [t]
  );

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
            label={label(season.season_name)}
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
          {t("全选")}
        </Button>

        <Button
          onClick={() => {
            setChosenSeasons([]);
          }}
        >
          {t("清空")}
        </Button>
      </div>
    ),
  };
};

export default useChoseSeasons;
