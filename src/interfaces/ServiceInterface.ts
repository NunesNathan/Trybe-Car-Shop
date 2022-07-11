import { DataResponse } from './GenericResponses';

export interface Service<T> {
  create(entity: T): Promise<DataResponse<T>>;
  read(): Promise<T[]>;
  readOne(id: string): Promise<T | null>;
  update(id: string, entity: T): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}
