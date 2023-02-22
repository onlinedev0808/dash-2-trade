export enum TableCols {
  Name = "name",
  Rank = "rank",
  Award = "award",
  Participants = "participants",
  StartDate = "start",
  EndDate = "end",
  Action = "action",
}

export const tableColumnsConfig = [
  {
    Header: "Contest Name",
    id: TableCols.Name,
    accessor: TableCols.Name,
  },
  {
    Header: "Your Rank",
    id: TableCols.Rank,
    accessor: TableCols.Rank,
  },
  {
    Header: "Award",
    id: TableCols.Award,
    accessor: TableCols.Award,
  },
  {
    Header: "Participants",
    id: TableCols.Participants,
    accessor: TableCols.Participants,
  },
  {
    Header: "Start Date",
    id: TableCols.StartDate,
    accessor: TableCols.StartDate,
  },
  {
    Header: "End Date",
    id: TableCols.EndDate,
    accessor: TableCols.EndDate,
  },
  {
    Header: "Action",
    id: TableCols.Action,
    accessor: TableCols.Action,
  },
];
