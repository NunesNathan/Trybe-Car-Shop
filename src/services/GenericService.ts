import { carSchema } from '../interfaces/CarInterface';
import { DataResponse } from '../interfaces/GenericResponses';
import { Model } from '../interfaces/ModelInterface';
import { Service } from '../interfaces/ServiceInterface';
import IErrorHttp from '../middleware/error/errorHttp';

export default class GenericService<T> implements Service<T> {
  constructor(
    protected model: Model<T>,
    protected schema: typeof carSchema,
  ) { }

  async create(entity: T): Promise<DataResponse<T>> {
    const parsed = this.schema.safeParse(entity);
    if (!parsed.success) {
      throw new IErrorHttp(
        400,
        parsed.error.message,
      );
    }
    return {
      status: 201,
      data: this.model.create(entity),
    };
  }

  read(): Promise<T[]> {
    return this.model.read();
  }

  readOne(id: string): Promise<T | null> {
    return this.model.readOne(id);
  }

  update(id: string, entity: T): Promise<T | null> {
    return this.model.update(id, entity);
  }

  delete(id: string): Promise<T | null> {
    return this.model.delete(id);
  }
}
