import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { Car } from '../../../interfaces/CarInterface';
import IErrorHttp from '../../../middleware/error/errorHttp';
import CarService from '../../../services/carService';
import CarController from '../../../controllers/CarController';
import * as mock from '../../mocks/carMocks';
import CarModel from '../../../models/CarModel';
import { Request, Response, NextFunction } from 'express';
import { afterEach } from 'mocha';

describe('Car Controller', () => {
  const req = {} as Request;
  const res = {} as Response;
  let next: NextFunction = () => {};
  const carService = new CarService(new CarModel());
  describe('Create Car', () => {
    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
    });

    afterEach(() => {
      (carService.create as SinonStub).restore();
    });

    it('Success case', async () => {
      sinon.stub(carService, 'create').resolves({ data: mock.responseValidCar, status: 201 });

      const carController = new CarController(carService);

      await carController.create(req, res, next);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(mock.responseValidCar)).to.be.true;
    });

    it('Fail case', async () => {
      const err = new IErrorHttp(400, 'year is required');
      sinon.stub(carService, 'create').throwsException(err);

      const carController = new CarController(carService);
      try {
        await carController.create(req, res, next);
      } catch (error) {
        expect(error).instanceOf(IErrorHttp);
        expect((next as sinon.SinonStub).calledWith(400, 'year is requireed')).to.be.true;
      }
    });
  });

  describe('Read Car', () => {
    before(() => {
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
    });

    afterEach(() => {
      (carService.read as SinonStub).restore();
    });

    it('Success case', async () => {
      sinon.stub(carService, 'read').resolves({ data: [mock.responseValidCar], status: 200 });

      const carController = new CarController(carService);

      await carController.read(req, res, next);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([mock.responseValidCar])).to.be.true;
    });
  });
});