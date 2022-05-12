type ProInfo = {
  id: number;
  pro_name: string;
};

type ProValue = {
  id: number;
  pro_name: string;
  value: number;
};

type SeasonInfo = {
  id: number;
  season_name: string;
  season_type: "regular" | "semi_final" | "final";
};

type SeasonYearInfo = {
  id: number;
  season_year_name: string;
};
