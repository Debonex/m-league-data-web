import clsx from "clsx";
import { FC, forwardRef, MouseEventHandler, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import api from "../utils/api";
import Arrow from "../components/Arrow";
import InnerLoading from "../components/InnerLoading";
import { ReactComponent as FilterSvg } from "../components/svg/Filter.svg";
import useChoseSeasons from "../hooks/useChoseSeasons";
import {
  fixed,
  percentage,
  proAvatarUrl,
  teamAvatarUrl,
} from "../utils/format";
import { umami } from "../utils/umami";
import Button from "components/Button";
import FlipMove from "react-flip-move";

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
  { key: "avg_first_score", label: "一位平均得点", format: fixed(2) },
  { key: "avg_second_score", label: "二位平均得点", format: fixed(2) },
  { key: "avg_third_score", label: "三位平均得点", format: fixed(2) },
  { key: "avg_fourth_score", label: "四位平均得点", format: fixed(2) },
  { key: "avg_agari_score", label: "平均打点", format: fixed(2) },
  { key: "avg_houjuu_score", label: "平均铳点", format: fixed(2), asc: true },
  { key: "ryukyoku_tenpai_rate", label: "流听率", format: percentage },
  { key: "agari_dama_rate", label: "默听率", format: percentage },
  { key: "blown_rate", label: "被炸率", format: percentage },
  { key: "avg_blown_score", label: "平均被炸点数", format: fixed(1) },
  { key: "richi_first_rate", label: "先制立直率", format: percentage },
  { key: "richi_chase_rate", label: "追立率", format: percentage },
  { key: "richi_chased_rate", label: "被追立率", format: percentage },
  { key: "avg_richi_turn", label: "立直巡目", format: fixed(3), asc: true },
  { key: "richi_agari_rate", label: "立直和率", format: percentage },
  { key: "richi_houjuu_rate", label: "立直铳率", format: percentage },
  { key: "avg_richi_agari_score", label: "立直平均打点", format: fixed(2) },
  { key: "furo_agari_rate", label: "副露和率", format: percentage },
  { key: "furo_houjuu_rate", label: "副露铳率", format: percentage, asc: true },
  { key: "avg_furo_agari_score", label: "副露平均打点", format: fixed(2) },
];

const LeaderBoard: FC = () => {
  // pro or team rank
  const [rankBy, setRankBy] = useState<"pro" | "team">("pro");
  // current rankable item
  const [rank, setRank] = useState<Rankable>({ key: "point", label: "Point" });
  const [list, setList] = useState<RankValue[]>([]);
  // if mobile rankable items show
  const [rankableShow, setRankableShow] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [asc, setAsc] = useState(false);

  const { t } = useTranslation();

  const {
    chosenSeasons,
    loading: seasonsLoading,
    Checkboxes: SeasonCheckboxes,
    CheckButtons: SeasonCheckButtons,
  } = useChoseSeasons();

  const fetchRank = async () => {
    setListLoading(true);
    const res = await api.post<RankValue[]>(`/${rankBy}/rank`, {
      key: rank.key,
      ...(seasonsLoading ? {} : { seasons: chosenSeasons }),
    });
    setListLoading(false);
    if (res.status === 200) {
      setAsc(!!rank.asc);
      setListAsc(res.data, !!rank.asc);
    }
  };

  useEffect(() => {
    if (chosenSeasons.length) {
      fetchRank();
    } else {
      setList([]);
    }
  }, [rank, chosenSeasons, rankBy]);

  const changeAsc = () => {
    setAsc(!asc);
    setListAsc(list, !asc);
  };

  const setListAsc = (list: RankValue[], asc: boolean) => {
    setList(list.sort((a, b) => (asc ? a.value - b.value : b.value - a.value)));
  };

  return (
    <div className="mx-auto h-full max-w-1920 grid-cols-[auto,minmax(0,1fr)] gap-4 p-4 md:grid">
      {/* rankable items */}
      <div className="hidden h-full flex-col overflow-auto pr-2 md:flex">
        {ranks.map((item) => (
          <RankableItem
            key={item.key}
            currentRank={rank}
            rank={item}
            onClick={() => {
              umami(`choose-rank:${item.label}`);
              setRank(item);
            }}
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
              umami(`choose-rank:${item.label}`);
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

      <div className="h-full grid-rows-[auto,auto,minmax(0,1fr)] overflow-auto md:grid">
        <div
          className={clsx(
            "mb-4 flex rounded-lg border-2 p-3",
            "dark:border-dark-outstand dark:bg-dark-secondary"
          )}
        >
          <Button active={rankBy === "pro"} onClick={() => setRankBy("pro")}>
            {t("选手")}
          </Button>
          <Button
            active={rankBy === "team"}
            onClick={() => setRankBy("team")}
            className="ml-2"
          >
            {t("队伍")}
          </Button>
        </div>

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

        {/* rank items */}
        <div className="relative">
          <div
            className={clsx(
              "h-full overflow-auto rounded-lg border-2 p-3 pt-0",
              "dark:border-dark-outstand dark:bg-dark-secondary"
            )}
          >
            <div
              className={clsx(
                "sticky top-0 z-10 flex py-2",
                "backdrop-blur-md dark:bg-dark-secondary/80 dark:text-white/50"
              )}
            >
              <div className="w-auto pl-1 md:w-1/5 md:pl-5">{t("排名")}</div>
              <div className="flex-shrink-0 flex-grow basis-0 text-center md:text-left">
                {t(rankBy === "pro" ? "姓名" : "队伍")}
              </div>
              <div
                className="flex flex-shrink-0 flex-grow basis-0 cursor-pointer items-center text-center md:text-left"
                onClick={changeAsc}
              >
                {t(rank.label)}
                <Arrow className="ml-2 h-4 w-4 text-primary-main" up={asc} />
              </div>
            </div>
            <FlipMove>
              {list.map((item, idx) => (
                <RankItem
                  key={(item as ProValue).pro_id ?? item.team_id}
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
                  format={rank.format}
                />
              ))}
            </FlipMove>
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
  const { t } = useTranslation();
  return (
    <div
      className={clsx(
        "cursor-pointer select-none whitespace-nowrap rounded-lg border-2 p-3 transition-colors hover:text-primary-main",
        {
          "dark:border-dark-outstand dark:hover:border-primary-outstand":
            rank.key !== currentRank.key,
          "border-primary-outstand bg-gradient-to-r from-primary-main/25 dark:to-dark-outstand":
            rank.key === currentRank.key,
        },
        props.className
      )}
      onClick={props.onClick}
    >
      <div
        className={clsx({ "text-primary-main": rank.key === currentRank.key })}
      >
        {t(rank.label)}
      </div>
    </div>
  );
};

type RankItemPros = {
  rank: number;
  item: RankValue;
  rankInnerClass: string;
  rankOuterClass: string;
  format?: (value: number) => string;
};

const RankItem: FC<RankItemPros> = forwardRef<HTMLAnchorElement, RankItemPros>(
  (props, ref) => {
    let item = props.item;
    let link, avatarUrl, name;
    if ((item as ProValue).pro_id) {
      item = item as ProValue;
      link = `/pro?id=${item.pro_id}`;
      avatarUrl = proAvatarUrl(item.pro_id);
      name = item.pro_name;
    } else {
      item = item as TeamValue;
      link = `/team?id=${item.team_id}`;
      avatarUrl = null;
      name = item.team_name;
    }

    return (
      <Link
        to={link}
        ref={ref}
        className={clsx(
          "group relative mt-1 flex items-center overflow-hidden rounded-l-lg transition-[color]",
          "dark:odd:bg-dark-outstand dark:hover:text-primary-main"
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
        <div className="flex flex-shrink-0 flex-grow basis-0 items-center overflow-hidden text-center md:text-left">
          {avatarUrl && (
            <img
              src={avatarUrl}
              className="mr-2 w-6 scale-95 rounded-full transition-transform group-hover:scale-100 md:mr-4 md:w-8"
            />
          )}
          <span>{name}</span>
          <img
            src={teamAvatarUrl(item.team_id)}
            className="absolute top-1/2 left-1/2 w-20 -translate-x-1/2 -translate-y-1/2 opacity-10 transition-transform group-hover:scale-125"
          />
        </div>
        <div
          className={clsx(
            "flex-shrink-0 flex-grow basis-0 py-2 text-center group-odd:bg-gradient-to-r md:text-left",
            "dark:group-odd:from-dark-outstand dark:group-odd:to-dark-secondary"
          )}
        >
          {props.format ? props.format(item.value) : item.value}
        </div>
      </Link>
    );
  }
);

RankItem.displayName = "RankItem";

export default LeaderBoard;
