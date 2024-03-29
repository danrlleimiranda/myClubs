

import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import SequelizeUser from "../database/models/UserModel";
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
          id: 2,
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


  it('POST /matches deve criar uma partidas', async () => {
    const match= 
        {
          id: 30,
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
        }

        const user = 
      {
        id: 1,
        username: "Admin",
        role: "admin",
        email: "admin@admin.com",
        password: "valid-hash",
      }
    ;
    const token = "TOKEN";

    // Stub do método jwt.sign para retornar o token
    sinon.stub(jwt, 'sign').callsFake(()=> token);
    sinon.stub(jwt, 'verify').callsFake((payload, secret, options) => ({ id: user.id, username: user.username }));


      
    sinon.stub(SequelizeMatch, 'create').resolves(match as any);


  const {status, body} = await chai.request(app).post('/matches').set('Authorization', `Bearer ${token}`).send({
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,})

    expect(status).to.be.equal(201)
    expect(body).to.be.deep.equal(match)
  });

});


