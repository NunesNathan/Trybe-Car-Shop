import { DataResponse } from './GenericResponses';

export interface Service<T> {
  create(entity: T): Promise<DataResponse<T>>;
  read(): Promise<DataResponse<T[]>>;
  readOne(id: string): Promise<DataResponse<T>>;
  update(id: string, entity: T): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}
