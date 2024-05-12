// export type WeeklyStatistics = Record<string, Statistics>;

export type Statistics = Record<string, Record<string, TasksDailyStatistics>>;

export type TasksDailyStatistics = {
  total: number;
  completed: number;
};

export interface TransformedData {
  key: string;
  percentage: number;
  color?: string;
  count?: number;
  value: {
    total: number;
    completed: number;
  };
  date: string;
  showLabel?: boolean;
}

export interface BarChartTransformedData extends TransformedData {
  date: string;
  percentageLeft: number;
  percentageDone: number;
}

export interface MonthlyWeekData {
  ratio: number;
  total: number;
  completed: number;
}
