import Card from "components/Card";
import useChooseSeasons from "hooks/useChooseSeasons";
import StatisticData from "pages/components/StatisticData";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import api from "utils/api";
import ProInfo from "./Info";

const Pro: FC = () => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const id = params.get("id");
  const [statistics, setStatistics] = useState<Statistics>();
  const [statisticsLoading, setStatisticsLoading] = useState(false);
  const [info, setInfo] = useState<ProInfo>();
  const [infoLoading, setInfoLoading] = useState(true);
  const {
    chosenSeasons,
    loading: seasonsLoading,
    CheckButtons,
    Checkboxes,
  } = useChooseSeasons();

  useEffect(() => {
    api
      .get<ProInfo>(`/pro/info/${id}`)
      .then((res) => {
        setInfoLoading(false);
        if (res.status === 200) {
          setInfo(res.data);
        }
      })
      .catch(() => {
        setInfoLoading(false);
      });
  }, []);

  const fetchStatistics = async () => {
    setStatisticsLoading(true);
    const res = await api.post<Statistics>("/pro/statistic", {
      id: Number(id),
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
  }, [chosenSeasons]);

  return (
    <div className="mx-auto max-w-1280 p-2 md:p-4">
      <Card title={t("个人信息")} className="mt-8" loading={infoLoading}>
        <ProInfo info={info} />
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

export default Pro;
