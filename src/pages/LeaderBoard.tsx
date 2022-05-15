import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import api from "../api";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import InnerLoading from "../components/InnerLoading";

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
  pro_id: number;
  pro_name: string;
  value: number | string;
};

const LeaderBoard: FC = () => {
  const [rank, setRank] = useState<Rankable>({ key: "point", label: "Point" });
  const [list, setList] = useState<ProRankItem[]>([]);
  const [seasons, setSeasons] = useState<SeasonInfo[]>([]);
  const [chosenSeasons, setChosenSeasons] = useState<number[]>([]);
  const [seasonYears, setSeasonYears] = useState<SeasonYearInfo[]>([]);
  const [filterLoading, setFilterLoading] = useState(true);
  const [listLoading, setListLoading] = useState(false);

  const fetchRank = async () => {
    setListLoading(true);
    const res = await api.post<ProValue[]>("/pro/rank", {
      key: rank.key,
      ...(seasons.length ? { seasons: chosenSeasons } : {}),
    });
    setListLoading(false);
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
  };

  useEffect(() => {
    if (chosenSeasons.length) {
      fetchRank();
    } else {
      setList([]);
    }
  }, [rank, chosenSeasons]);

  useEffect(() => {
    Promise.all([
      api.get<SeasonInfo[]>("/season/all"),
      api.get<SeasonYearInfo[]>("/season_year/all"),
    ])
      .then((results) => {
        setFilterLoading(false);
        if (results[0].status === 200 && results[1].status === 200) {
          setSeasons(results[0].data);
          setChosenSeasons(results[0].data.map((item) => item.id));
          setSeasonYears(results[1].data);
        }
      })
      .catch(() => {
        setFilterLoading(false);
      });
  }, []);

  const handleSeasonChange = (targetId: number, checked: boolean) => {
    if (checked) {
      setChosenSeasons([...chosenSeasons, targetId]);
    } else {
      setChosenSeasons(chosenSeasons.filter((id) => id !== targetId));
    }
  };

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
            key={item.key}
          >
            <div>{item.label}</div>
          </div>
        ))}
      </div>

      <div className="ml-4 flex-grow">
        {/* filters */}
        <div
          className={clsx([
            "relative mb-4 rounded-lg border-2 p-3",
            "dark:border-dark-outstand dark:bg-dark-secondary",
          ])}
        >
          {/* seasons */}
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
          {filterLoading && <InnerLoading />}
        </div>

        {/* rank items */}
        <div
          className={clsx([
            "relative rounded-lg border-2 p-3",
            "dark:border-dark-outstand dark:bg-dark-secondary",
          ])}
        >
          <div className={clsx(["flex py-2", "dark:text-white/50"])}>
            <div className="w-1/5 pl-5">排名</div>
            <div className="flex-shrink-0 flex-grow basis-0">姓名</div>
            <div className="flex-shrink-0 flex-grow basis-0">{rank.label}</div>
          </div>
          <div>
            {list.map((item, idx) => (
              <RankItem
                key={item.pro_id}
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
          {listLoading && <InnerLoading />}
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
        "dark:odd:bg-dark-outstand",
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
          "flex-shrink-0 flex-grow basis-0 py-2 group-odd:bg-gradient-to-r",
          "dark:group-odd:from-dark-outstand dark:group-odd:to-dark-secondary",
        ])}
      >
        {props.value}
      </div>
    </div>
  );
};

export default LeaderBoard;
