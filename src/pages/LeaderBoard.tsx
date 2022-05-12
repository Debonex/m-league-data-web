import clsx from "clsx";
import { FC, useCallback, useEffect, useState } from "react";
import api from "../api";

const percentage = (value: number) => `${(value * 100).toFixed(2)}%`;
const fixed = (num: number) => (value: number) => `${value.toFixed(num)}`;

const ranks: Rankable[] = [
  { key: "point", label: "Point" },
  { key: "avg_point", label: "场均Point", format: fixed(3) },
  { key: "avg_rank", label: "平均顺位", format: fixed(2), asc: true },
  { key: "game_num", label: "半庄数" },
  { key: "kyoku_num", label: "对局数" },
  { key: "agari_rate", label: "和牌率", format: percentage },
  { key: "houjuu_rate", label: "放铳率", format: percentage, asc: true },
  { key: "furo_rate", label: "副露率", format: percentage },
  { key: "richi_rate", label: "立直率", format: percentage },
  { key: "highest_score", label: "最高半庄得点" },
  { key: "lowest_score", label: "最低半庄得点" },
  { key: "first_rate", label: "一位率", format: percentage },
  { key: "second_rate", label: "二位率", format: percentage },
  { key: "third_rate", label: "三位率", format: percentage },
  { key: "fourth_rate", label: "四位率", format: percentage, asc: true },
  { key: "avg_agari_score", label: "平均打点", format: fixed(2) },
  { key: "avg_houjuu_score", label: "平均铳点", format: fixed(2), asc: true },
  { key: "ryukyoku_tenpai_rate", label: "流听率", format: percentage },
  { key: "dama_rate", label: "默听率", format: percentage },
  { key: "blown_rate", label: "被炸率", format: percentage },
  { key: "richi_first_rate", label: "先制立直率", format: percentage },
  { key: "richi_chase_rate", label: "追立率", format: percentage },
  { key: "richi_chased_rate", label: "被追立率", format: percentage },
];

type ProRankItem = {
  id: number;
  pro_name: string;
  value: number | string;
};

const LeaderBoard: FC = () => {
  const [rank, setRank] = useState<Rankable>({ key: "point", label: "Point" });
  const [list, setList] = useState<ProRankItem[]>([]);
  const [seasons, setSeasons] = useState<SeasonInfo[]>([]);
  const [seasonYears, setSeasonYears] = useState<SeasonYearInfo[]>([]);

  const fetchRank = useCallback(async () => {
    const res = await api.post<ProValue[]>("/pro/rank", { key: rank.key });
    if (res.status === 200) {
      if (!rank.asc) {
        res.data.sort((a, b) => b.value - a.value);
      }
      if (rank.format) {
        const format = rank.format;
        setList(
          res.data.map((item) => ({
            ...item,
            value: format(item.value),
          }))
        );
      } else {
        setList(res.data);
      }
    }
  }, [rank]);

  useEffect(() => {
    fetchRank();
  }, [rank]);

  useEffect(() => {
    Promise.all([
      api.get<SeasonInfo[]>("/season/all"),
      api.get<SeasonYearInfo[]>("/season_year/all"),
    ]).then((results) => {
      if (results[0].status === 200 && results[1].status === 200) {
        setSeasons(results[0].data);
        setSeasonYears(results[1].data);
      }
    });
  }, []);

  return (
    <div className="mx-auto flex max-w-1920 p-4">
      {/* rankable items */}
      <div className="flex flex-col">
        {ranks.map((item) => (
          <div
            className={clsx({
              "mb-2 cursor-pointer rounded-lg border-2 p-3": true,
              "dark:border-dark-outstand": item.key !== rank.key,
              "border-primary-outstand bg-gradient-to-r from-primary-main/25 dark:to-dark-outstand":
                item.key === rank.key,
            })}
            onClick={() => setRank(item)}
          >
            <div>{item.label}</div>
          </div>
        ))}
      </div>

      <div className="ml-4 flex-grow">
        {/* filters */}
        <div
          className={clsx([
            "mb-4 rounded-lg border-2 p-3",
            "dark:border-dark-outstand dark:bg-dark-secondary",
          ])}
        ></div>
        {/* rank items */}
        <div
          className={clsx([
            "rounded-lg border-2 p-3",
            "dark:border-dark-outstand dark:bg-dark-secondary",
          ])}
        >
          <div className={clsx(["flex py-2", "dark:text-white/50"])}>
            <div className="w-1/5 pl-5">排名</div>
            <div className="flex-shrink-0 flex-grow basis-0">姓名</div>
            <div className="flex-shrink-0 flex-grow basis-0">{rank.label}</div>
          </div>
          {list.map((item, idx) => (
            <RankItem
              key={item.id}
              rank={idx + 1}
              name={item.pro_name}
              value={item.value}
              rankInnerClass={clsx({
                "border-l-2": idx < 3,
                "border-l-gold": idx === 0,
                "border-l-silver": idx === 1,
                "border-l-bronze": idx === 2,
              })}
              rankOuterClass={clsx({
                "bg-gradient-to-r": idx < 3,
                "from-gold/25 dark:to-dark-outstand": idx === 0,
                "from-silver/25 dark:to-dark-secondary": idx === 1,
                "from-bronze/25 dark:to-dark-outstand": idx === 2,
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const RankItem: FC<{
  rank: number;
  name: string;
  value: number | string;
  rankInnerClass: string;
  rankOuterClass: string;
}> = (props) => {
  return (
    <div
      className={clsx([
        "group mt-1 flex items-center rounded-l-lg",
        "dark:even:bg-dark-outstand",
      ])}
    >
      <div
        className={clsx([
          "w-1/5 rounded-l-lg bg-gradient-to-r py-2",
          props.rankOuterClass,
        ])}
      >
        <div className={clsx([props.rankInnerClass, "pl-3"])}>{props.rank}</div>
      </div>
      <div className="flex-shrink-0 flex-grow basis-0">{props.name}</div>
      <div
        className={clsx([
          "flex-shrink-0 flex-grow basis-0 py-2 group-even:bg-gradient-to-r",
          "dark:group-even:from-dark-outstand dark:group-even:to-dark-secondary",
        ])}
      >
        {props.value}
      </div>
    </div>
  );
};

export default LeaderBoard;
