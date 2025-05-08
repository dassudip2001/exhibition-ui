export interface IQueryFilter {
  audience: string;
  page: number;
  per_page: number;
  q: string;
  workspaceId: number | string;
}
