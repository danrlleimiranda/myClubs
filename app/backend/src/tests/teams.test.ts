import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import SequelizeTeam from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /teams', () => {
  afterEach(() => {
    sinon.restore()
  })
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('GET /teams deve retornar um array com todos os times', async () => {
    const teams = [{
      id: 1, team_name: 'São Paulo FC'}, {id: 2, team_name: 'Vitória EC'}]

    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any)


    const {status, body} = await chai.request(app).get('/teams').send();

    expect(status).to.be.equal(200)
    expect(body).to.be.deep.equal(teams)

  });

  it('GET /:id deve retornar o time referente ao id', async () => {
    const team = {
      id: 1, team_name: 'EC Vitória'}

    sinon.stub(SequelizeTeam, 'findOne').resolves(team as any)


    const {status, body} = await chai.request(app).get('/teams/1').send();

    expect(status).to.be.equal(200)
    expect(body).to.be.deep.equal(team)

  });
});
