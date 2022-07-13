import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { Car } from '../../../interfaces/CarInterface';
import IErrorHttp from '../../../middleware/error/errorHttp';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/carService';
import * as mock from '../../mocks/carMocks';

describe('Car Service', () => {
  describe('Create Car', () => {
    const carModel = new CarModel();
    before(() => {
      sinon.stub(carModel, 'create').resolves(mock.responseValidCar);
    });

    after(() => {
      (carModel.create as SinonStub).restore();
    });

    it('Success case', async () => {
      const carService = new CarService(carModel);

      const carCreated = await carService.create(mock.validCar);

      expect(carCreated).to.be.deep.equal({ status: 201, data: mock.responseValidCar });
    });
    
    it('Fail case', async () => {
      const carService = new CarService(carModel);
      try {
        await carService.create(mock.invalidCar as Car);
      } catch (error) {
        expect(error).instanceOf(IErrorHttp);
        expect((error as IErrorHttp).message).to.be.contains('year is required');
        expect((error as IErrorHttp).status).to.be.equal(400);
      }
    });
  });

  describe('Read Cars', () => {
    const carModel = new CarModel();
    before(() => {
      sinon.stub(carModel, 'read').resolves([mock.responseValidCar]);
    });

    after(() => {
      (carModel.read as SinonStub).restore();
    });

    it('Success case', async () => {
      const carService = new CarService(carModel);

      const carsReaded = await carService.read();

      expect(carsReaded).to.be.deep.equal({ status: 200, data: [mock.responseValidCar] });
    });
  });
});