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
      data: await this.model.create(entity),
    };
  }

  async read(): Promise<DataResponse<T[]>> {
    return {
      status: 200,
      data: await this.model.read(),
    };
  }

  async readOne(id: string): Promise<DataResponse<T>> {
    if (id.length < 24) {
      return {
        status: 400,
        data: 'Id must have 24 hexadecimal characters',
      };
    }
    const exists = await this.model.readOne(id);
    if (!exists) {
      return {
        status: 404,
        data: 'Object not found',
      };
    }
    return {
      status: 200,
      data: exists,
    };
  }

  async update(id: string, entity: T): Promise<DataResponse<T>> {
    if (id.length < 24) {
      return {
        status: 400,
        data: 'Id must have 24 hexadecimal characters',
      };
    }

    if (Object.keys(entity).length === 0) {
      return { status: 400, data: 'You need to pass a entity' };
    }

    const exists = await this.model.update(id, entity);
    if (!exists) {
      return {
        status: 404,
        data: 'Object not found',
      };
    }
    return { status: 200, data: exists };
  }

  delete(id: string): Promise<T | null> {
    return this.model.delete(id);
  }
}
