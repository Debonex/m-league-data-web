import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import api from "../utils/api";
import Card from "../components/Card";
import useChooseSeasons from "../hooks/useChooseSeasons";
import { dateStrToAge, proAvatarUrl } from "../utils/format";
import StatisticData from "./components/StatisticData";

const Team: FC = () => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const id = params.get("id");
  const [list, setList] = useState<ProInfo[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [statistics, setStatistics] = useState<Statistics>();
  const [statisticsLoading, setStatisticsLoading] = useState(false);
  const {
    chosenSeasons,
    loading: seasonsLoading,
    CheckButtons,
    Checkboxes,
  } = useChooseSeasons();

  useEffect(() => {
    api
      .get<ProInfo[]>(`/pro/list_by_team_id/${id}`)
      .then((res) => {
        setListLoading(false);
        if (res.status === 200) {
          setList(res.data);
        }
      })
      .catch(() => {
        setListLoading(false);
      });
  }, []);

  const fetchStatistics = async () => {
    setStatisticsLoading(true);
    const res = await api.post<Statistics>("/team/statistic", {
      team_id: Number(id),
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
      <Card title={t("队伍成员")} loading={listLoading}>
        <div className="grid grid-cols-1 gap-12 p-12 md:grid-cols-2">
          {list.map((pro) => (
            <Link to={`/pro?id=${pro.id}`} key={pro.id} className="group flex">
              <img
                src={proAvatarUrl(pro.id)}
                className={clsx(
                  "scale-95 rounded-full shadow-md shadow-primary-outstand transition-all",
                  "group-hover:scale-100 group-hover:shadow-lg group-hover:shadow-primary-main"
                )}
              />
              <div className="ml-4 flex flex-col justify-center">
                <div className="text-xl font-semibold">{pro.pro_name}</div>
                <div className="mt-4 md:flex">
                  <InfoItem
                    title={t("年龄")}
                    value={dateStrToAge(pro.birth)}
                    className="md:pr-4"
                  />
                  <InfoItem
                    title={t("出身地")}
                    value={pro.birth_place}
                    className={clsx(
                      "md:border-l-2 md:border-r-2 md:px-4",
                      "dark:border-white/40"
                    )}
                  />
                  <InfoItem
                    title={t("Pro历")}
                    value={`${new Date().getFullYear() - pro.pro_year} ${t(
                      "年"
                    )}`}
                    className="md:pl-4"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
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

const InfoItem: FC<{
  title: string;
  value: string | number;
  className?: string;
}> = ({ title, value, className }) => (
  <div className={clsx("flex whitespace-nowrap", className)}>
    <div className="w-12 md:w-auto">{title}</div>
    <div className="ml-2">{value}</div>
  </div>
);

export default Team;
