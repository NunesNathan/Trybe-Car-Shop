import { Model as MongooseModel, isValidObjectId } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

export default abstract class GenericModel<T> implements Model<T> {
  constructor(protected modelMongoose: MongooseModel<T>) { }

  async create(entity: T): Promise<T> {
    return this.modelMongoose.create(entity);
  }

  async read(): Promise<T[]> {
    return this.modelMongoose.find();
  }

  async readOne(id: string): Promise<T | null> {
    return this.modelMongoose.findById(id);
  }

  async update(id: string, entity: T): Promise<T | null> {
    if (!isValidObjectId(id)) return null;
    return this.modelMongoose.findOneAndUpdate({ _id: id }, entity);
  }

  async delete(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) return null;
    return this.modelMongoose.findOneAndDelete({ id });
  }
}
