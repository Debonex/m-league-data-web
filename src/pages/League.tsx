import Card from "components/Card";
import useChooseTeams from "hooks/useChooseTeams";
import useChooseSeasons from "hooks/useChooseSeasons";
import StatisticData from "pages/components/StatisticData";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "utils/api";

const League: FC = () => {
  const { t } = useTranslation();
  const {
    chosenSeasons,
    loading: seasonsLoading,
    CheckButtons,
    Checkboxes,
  } = useChooseSeasons();
  const {
    chosenTeams,
    loading: teamsLoading,
    ChecksBlock: TeamsChecks,
  } = useChooseTeams();
  const [statistics, setStatistics] = useState<Statistics>();
  const [statisticsLoading, setStatisticsLoading] = useState(false);

  const fetchStatistics = async () => {
    setStatisticsLoading(true);
    const res = await api.post<Statistics>("/league/statistic", {
      ...(teamsLoading ? {} : { teams: chosenTeams }),
      ...(seasonsLoading ? {} : { seasons: chosenSeasons }),
    });
    setStatisticsLoading(false);
    if (res.status === 200) {
      setStatistics(res.data);
    }
  };

  useEffect(() => {
    if (!seasonsLoading) {
      fetchStatistics();
    }
  }, [chosenSeasons, chosenTeams]);

  return (
    <div className="mx-auto max-w-1280 p-2 md:p-4">
      <Card title={t("队伍")} loading={teamsLoading}>
        <div className="p-4">{TeamsChecks}</div>
      </Card>
      <Card title={t("赛季过滤")} className="mt-8" loading={seasonsLoading}>
        <div className="p-4">
          {Checkboxes}
          {CheckButtons}
        </div>
      </Card>
      <Card title={t("统计信息")} className="my-8" loading={statisticsLoading}>
        <div className="p-4">
          <StatisticData statistics={statistics} />
        </div>
      </Card>
    </div>
  );
};

export default League;
