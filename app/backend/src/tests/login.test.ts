import * as sinon from "sinon";
import * as chai from "chai";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

import SequelizeUser from "../database/models/UserModel";

chai.use(chaiHttp);

const { expect } = chai;

describe("Rota /login", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("POST /login deve retornar um token", async () => {
    const credentials = {
      email: "admin@admin.com",
      password: "password",
    };
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
    sinon.stub(bcrypt, 'compare').resolves(true);
    sinon.stub(SequelizeUser, "findOne").resolves(SequelizeUser.build(user));
    sinon.stub(jwt, 'sign').callsFake((payload, secret, options) => token);

    const { status, body } = await chai
      .request(app)
      .post("/login")
      .send(credentials);

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ token });
  });

  it("POST /login deve retornar um token", async () => {
    const credentials = {
      email: "invalid@admin.com",
      password: "password",
    };
    

    sinon.stub(SequelizeUser, "findOne").resolves(null);

    const { status, body } = await chai
      .request(app)
      .post("/login")
      .send(credentials);

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });
});
