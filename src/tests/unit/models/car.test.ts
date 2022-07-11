import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon, { SinonStub } from 'sinon';
import CarModel from '../../../models/CarModel';
import * as mock from '../../mocks/carMocks';

describe('Car Model', () => {
  describe('Create Car', () => {
    before(() => {
      sinon.stub(Model, 'create').resolves(mock.responseValidCar);
    });

    after(() => {
      (Model.create as SinonStub).restore();
    });

    it('Success case', async () => {
      const carModel = new CarModel();

      const carCreated = await carModel.create(mock.validCar);

      expect(carCreated).to.be.deep.equal(mock.responseValidCar);
    });
  });
});