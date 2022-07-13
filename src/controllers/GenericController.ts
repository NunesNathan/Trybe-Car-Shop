import { NextFunction, Response, Request } from 'express';
import { Service } from '../interfaces/ServiceInterface';

export interface RequestWithBody<T> extends Request {
  body: T;
}

export default class GenericController<T> {
  constructor(protected service: Service<T>) { }

  async create(
    req: RequestWithBody<T>,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { body } = req;

    try {
      const { data, status } = await this.service.create(body);

      return res.status(status).json(data);
    } catch (err) {
      next(err);
    }
  }

  async read(
    req: RequestWithBody<T>,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { status, data } = await this.service.read() || [];
      
      return res.status(status).json(data);
    } catch (err) {
      next(err);
    }
  }

  async readOne(
    req: RequestWithBody<T>,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = req.params;
    try {
      const { status, data } = await this.service.readOne(id);
      // para satisfazer o teste
      if (status !== 200) return res.status(status).json({ error: data });

      return res.status(status).json(data);
    } catch (err) {
      next(err);
    }
  }
  
  async update(
    req: RequestWithBody<T>,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = req.params;
    const { body } = req;

    try {
      const requested = await this.service.update(id, body);
      
      return res.status(200).json(requested);
    } catch (err) {
      next(err);
    }
  }

  async delete(
    req: RequestWithBody<T>,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { id } = req.params;

    try {
      const requested = await this.service.delete(id);
      
      return res.status(200).json(requested);
    } catch (err) {
      next(err);
    }
  }
}
