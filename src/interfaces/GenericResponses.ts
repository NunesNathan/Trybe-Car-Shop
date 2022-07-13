export interface DataResponse<T> {
  status: number;
  data: Awaited<T> | Awaited<T[] | string>;
}