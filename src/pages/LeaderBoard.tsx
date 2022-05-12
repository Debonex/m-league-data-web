import clsx from "clsx";
import { FC, useCallback, useEffect, useState } from "react";
import api from "../api";

const ranks: Rankable[] = [
  { key: "point", label: "Point" },
  { key: "avg_point", label: "场均Point" },
  { key: "game_num", label: "半庄数" },
  { key: "kyoku_num", label: "对局数" },
  { key: "agari_rate", label: "和牌率", percentage: true },
  { key: "houjuu_rate", label: "放铳率", percentage: true, asc: true },
  { key: "furo_rate", label: "副露率", percentage: true },
  { key: "richi_rate", label: "立直率", percentage: true },
  { key: "highest_score", label: "最高半庄得点" },
  { key: "lowest_score", label: "最低半庄得点" },
  { key: "first_rate", label: "一位率", percentage: true },
];

const LeaderBoard: FC = () => {
  const [rank, setRank] = useState<Rankable>({ key: "point", label: "Point" });
  const [list, setList] = useState<ProValue[]>([]);

  const fetchRank = useCallback(async () => {
    const res = await api.post<ProValue[]>("/pro/rank", { key: rank.key });
    if (res.status === 200) {
      if (!rank.asc) {
        res.data.sort((a, b) => b.value - a.value);
      }
      setList(res.data);
    }
  }, [rank]);

  useEffect(() => {
    fetchRank();
  }, [rank]);

  return (
    <div className="mx-auto flex max-w-1920 p-4">
      <div className="flex flex-col">
        {ranks.map((rank) => (
          <div className="cursor-pointer" onClick={() => setRank(rank)}>
            {rank.label}
          </div>
        ))}
      </div>

      <div
        className={clsx([
          "ml-4 flex-grow overflow-auto rounded-lg border-2",
          "dark:border-dark-outstand dark:bg-dark-secondary",
        ])}
      >
        {list.map((item, idx) => (
          <RankItem
            key={item.id}
            rank={idx + 1}
            name={item.pro_name}
            value={
              rank.percentage ? `${(item.value * 100).toFixed(2)}%` : item.value
            }
          />
        ))}
      </div>
    </div>
  );
};

const RankItem: FC<{ rank: number; name: string; value: number | string }> = (
  props
) => {
  return (
    <div className="flex py-2">
      <div className="w-10">{props.rank}</div>
      <div className="flex-shrink-0 flex-grow basis-0">{props.name}</div>
      <div className="flex-shrink-0 flex-grow basis-0">{props.value}</div>
    </div>
  );
};

export default LeaderBoard;
