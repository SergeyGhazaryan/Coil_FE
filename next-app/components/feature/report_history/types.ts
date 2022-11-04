export interface Types {
  FEShow: string;
  BEReqBody: string;
  BEResult: string;
}

export const columns = [
  { id: "name", label: "Name", minWidth: 173 },
  {
    id: "date",
    label: "Create Date",
    minWidth: 173,
    align: "right",
  },
  {
    id: "edit/delete",
    label: "Edit/Delete",
    minWidth: 173,
    align: "right",
  },
];
