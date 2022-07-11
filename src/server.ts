import express from 'express';
import connectToDatabase from './connection';
import ErrorMiddleware from './middleware/error/errorUseMiddleware';
import carRouter from './router/carRouter';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  public startServer(PORT: string | number = 3001): void {
    connectToDatabase();
    this.app.listen(
      PORT,
      () => console.log(`Server running here 👉 http://localhost:${PORT}`),
    );
  }

  private config() {
    this.app.use(express.json());
    this.app.use('/cars', carRouter);
    this.app.use(ErrorMiddleware.errorTreatment);
  }

  public getApp() {
    return this.app;
  }
}

export default new App();
