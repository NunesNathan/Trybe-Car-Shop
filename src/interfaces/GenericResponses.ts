export interface DataResponse<T> {
  status: number;
  data: Promise<T> | Promise<T[]>;
}