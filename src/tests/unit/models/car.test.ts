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
      const movieModel = new CarModel();

      const movieCreated = await movieModel.create(mock.validCar);

      expect(movieCreated).to.be.deep.equal(mock.responseValidCar);
    });
  });
});