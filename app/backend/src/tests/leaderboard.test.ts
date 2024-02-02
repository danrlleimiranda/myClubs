

import * as sinon from "sinon";
import * as chai from "chai";

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import SequelizeTeam from '../database/models/TeamModel';
import { matchesAway, matchesHome, resultsAway, resultsHome } from "./mocks/leaderboardMock";
import SequelizeMatch from "../database/models/MatchModel";
import { FindOptions, IncludeOptions, Includeable, Model } from "sequelize";

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /matches', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('GET /leaderboard/home deve retornar um array com os dados dos times jogando em casa', async () => {
   

    

    sinon.stub(SequelizeTeam, 'findAll').resolves(matchesHome as any)
    const {status, body} = await chai.request(app).get('/leaderboard/home')

    expect(status).to.be.equal(200)
    expect(body).to.be.deep.equal(resultsHome)
  });

//   it('GET /leaderboard/away deve retornar um array com os dados dos times jogando fora', async () => {      

//   sinon.stub(SequelizeTeam, 'findAll').resolves(SequelizeTeam.bulkBuild(matchesAway))
  
//     const {status, body} = await chai.request(app).get('/leaderboard/away')

//     expect(status).to.be.equal(200)
//     expect(body).to.be.deep.equal(resultsAway)
//   });


});


