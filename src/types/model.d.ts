type ProInfo = {
  id: number;
  pro_name: string;
  birth: string;
  birth_place: string;
  pro_year: number;
};

type ProValue = {
  pro_id: number;
  pro_name: string;
  value: number;
};

type SeasonInfo = {
  id: number;
  season_year_id: number;
  season_name: string;
  season_type: "regular" | "semi_final" | "final";
};

type SeasonYearInfo = {
  id: number;
  season_year_name: string;
};

type Statistics = {
  game_num: number;
  kyoku_num: number;
  point: number;
  avg_point: number;
  agari_rate: number;
  houjuu_rate: number;
  houjuu_menzen_rate: number;
  houjuu_furo_rate: number;
  houjuu_richi_rate: number;
  houjuu_to_dama_rate: number;
  houjuu_to_furo_rate: number;
  houjuu_to_richi_rate: number;
  tsumo_rate: number;
  agari_dama_rate: number;
  agari_furo_rate: number;
  agari_richi_rate: number;
  ryukyoku_rate: number;
  ryukyoku_tenpai_rate: number;
  furo_rate: number;
  furo_agari_rate: number;
  furo_ryukyoku_rate: number;
  furo_houjuu_rate: number;
  avg_furo_agari_score: number;
  richi_rate: number;
  avg_agari_turn: number;
  avg_agari_score: number;
  avg_houjuu_score: number;
  avg_rank: number;
  blown_rate: number;
  avg_blown_score: number;
  ron_rate: number;
  first_rate: number;
  second_rate: number;
  third_rate: number;
  fourth_rate: number;
  richi_agari_rate: number;
  richi_houjuu_rate: number;
  richi_tsumo_rate: number;
  avg_richi_agari_score: number;
  richi_ryukyoku_rate: number;
  avg_richi_turn: number;
  avg_richi_dora: number;
  richi_first_rate: number;
  richi_chase_rate: number;
  richi_chased_rate: number;
  ippatsu_rate: number;
  uradora_rate: number;
  highest_score: number;
  lowest_score: number;
  renchan_max_num: number;
};
