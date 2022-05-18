import clsx from "clsx";
import { FC, MouseEventHandler, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import InnerLoading from "../components/InnerLoading";
import { ReactComponent as FilterSvg } from "../components/svg/Filter.svg";
import useChoseSeasons from "../hooks/useChoseSeasons";
import { ossUrl } from "../utils/constants";
import { fixed, percentage } from "../utils/format";

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
  team_id: number;
  pro_name: string;
  value: number | string;
};

const LeaderBoard: FC = () => {
  // current rankable item
  const [rank, setRank] = useState<Rankable>({ key: "point", label: "Point" });
  const [list, setList] = useState<ProRankItem[]>([]);
  // if mobile rankable items show
  const [rankableShow, setRankableShow] = useState(false);
  const [listLoading, setListLoading] = useState(false);

  const {
    chosenSeasons,
    loading: seasonsLoading,
    Checkboxes: SeasonCheckboxes,
    CheckButtons: SeasonCheckButtons,
  } = useChoseSeasons();

  const fetchRank = async () => {
    setListLoading(true);
    const res = await api.post<ProValue[]>("/pro/rank", {
      key: rank.key,
      ...(seasonsLoading ? {} : { seasons: chosenSeasons }),
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

  useEffect(() => {
    if (chosenSeasons.length) {
      fetchRank();
    } else {
      setList([]);
    }
  }, [rank, chosenSeasons]);

  return (
    <div className="mx-auto flex max-w-1920 p-4">
      {/* rankable items */}
      <div className="hidden flex-col md:flex">
        {ranks.map((item) => (
          <RankableItem
            key={item.key}
            currentRank={rank}
            rank={item}
            onClick={() => setRank(item)}
            className="mb-2"
          />
        ))}
      </div>

      {/* mobile: rankable items */}
      <div
        className={clsx(
          "fixed bottom-0 left-0 z-40 grid h-screen w-screen grid-cols-2 gap-2 overflow-auto p-2 transition-transform",
          "dark:bg-dark-main/95",
          {
            "translate-y-full": !rankableShow,
            "translate-y-0": rankableShow,
          }
        )}
      >
        {ranks.map((item) => (
          <RankableItem
            key={item.key}
            rank={item}
            currentRank={rank}
            onClick={() => {
              setRank(item);
              setRankableShow(false);
            }}
          />
        ))}
      </div>

      {/* mobile: show rankable items button */}
      <div
        className={clsx(
          "fixed bottom-0 right-0 z-50 cursor-pointer select-none rounded-tl-full border-l-2 border-t-2 border-primary-main p-4 text-primary-main md:hidden",
          "dark:bg-dark-deep/90"
        )}
        onClick={() => setRankableShow(!rankableShow)}
      >
        <FilterSvg
          height={20}
          width={20}
          className="translate-x-1.5 translate-y-1.5"
        />
      </div>

      <div className="ml-4 flex-grow">
        {SeasonFilter}

        {/* rank items */}
        <div
          className={clsx(
            "relative rounded-lg border-2 p-3",
            "dark:border-dark-outstand dark:bg-dark-secondary"
          )}
        >
          <div className={clsx("flex py-2", "dark:text-white/50")}>
            <div className="w-16 pl-5 md:w-1/5">排名</div>
            <div className="flex-shrink-0 flex-grow basis-0 text-center md:text-left">
              姓名
            </div>
            <div className="flex-shrink-0 flex-grow basis-0 text-center md:text-left">
              {rank.label}
            </div>
          </div>
          <div>
            {list.map((item, idx) => (
              <RankItem
                key={item.pro_id}
                rank={idx + 1}
                item={item}
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

const RankableItem: FC<{
  rank: Rankable;
  currentRank: Rankable;
  onClick: MouseEventHandler;
  className?: string;
}> = (props) => {
  const rank = props.rank;
  const currentRank = props.currentRank;
  return (
    <div
      className={clsx(
        "cursor-pointer select-none whitespace-nowrap rounded-lg border-2 p-3",
        {
          "dark:border-dark-outstand": rank.key !== currentRank.key,
          "border-primary-outstand bg-gradient-to-r from-primary-main/25 dark:to-dark-outstand":
            rank.key === currentRank.key,
        },
        props.className
      )}
      onClick={props.onClick}
    >
      <div>{rank.label}</div>
    </div>
  );
};

const RankItem: FC<{
  rank: number;
  item: ProRankItem;
  rankInnerClass: string;
  rankOuterClass: string;
}> = (props) => {
  const item = props.item;
  return (
    <div
      className={clsx(
        "group relative mt-1 flex items-center overflow-hidden rounded-l-lg",
        "dark:odd:bg-dark-outstand"
      )}
    >
      <div
        className={clsx(
          "w-16 rounded-l-lg bg-gradient-to-r py-2 md:w-1/5",
          props.rankOuterClass
        )}
      >
        <div className={clsx(props.rankInnerClass, "pl-3")}>{props.rank}</div>
      </div>
      <Link
        to={`/pro?id=${item.pro_id}`}
        className="flex flex-shrink-0 flex-grow basis-0 items-center overflow-hidden text-center md:text-left"
      >
        <img
          src={`${ossUrl}/avatars/${item.pro_id}.png`}
          className="z-10 w-6 rounded-full md:w-8"
        />
        <span className="z-10 ml-2 md:ml-4">{item.pro_name}</span>
        <img
          src={`${ossUrl}/teams/${item.team_id}.${
            [8, 1].includes(item.team_id) ? "png" : "svg"
          }`}
          className="absolute top-1/2 left-1/2  w-20 -translate-x-1/2 -translate-y-1/2 opacity-10"
        />
      </Link>
      <div
        className={clsx(
          "flex-shrink-0 flex-grow basis-0 py-2 text-center group-odd:bg-gradient-to-r md:text-left",
          "dark:group-odd:from-dark-outstand dark:group-odd:to-dark-secondary"
        )}
      >
        {item.value}
      </div>
    </div>
  );
};

export default LeaderBoard;
