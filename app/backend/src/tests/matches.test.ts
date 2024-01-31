

import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import SequelizeMatch from '../database/models/MatchModel'
chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /matches', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('GET /matches deve retornar um array com todas as partidas', async () => {
    const matches= [
        {
          id: 1,
          homeTeamId: 16,
          homeTeamGoals: 1,
          awayTeamId: 8,
          awayTeamGoals: 1,
          inProgress: false,
          homeTeam: {
            teamName: "São Paulo"
          },
          awayTeam: {
            teamName: 'Grêmio'
          }
        },
        {
          id: 41,
          homeTeamId: 16,
          homeTeamGoals: 2,
          awayTeamId: 9,
          awayTeamGoals: 0,
          inProgress: true,
          homeTeam: {
            teamName: 'São Paulo'
          },
          awayTeam: {
            teamName: 'Internacional'
          }
        }
      ]
    sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any)


    const {status, body} = await chai.request(app).get('/matches')

    expect(status).to.be.equal(200)
    expect(body).to.be.deep.equal(matches)

  });

});


