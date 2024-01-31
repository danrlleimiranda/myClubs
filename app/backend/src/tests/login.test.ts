import * as sinon from "sinon";
import * as chai from "chai";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import Example from "../database/models/ExampleModel";

import { Response } from "superagent";
import SequelizeUser from "../database/models/UserModel";
import LoginService from "../services/LoginService";

chai.use(chaiHttp);

const { expect } = chai;

describe("Rota /login", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("GET /login deve retornar um token", async () => {
    const credentials = {
      email: "admin@admin.com",
      password: "password",
    };
    const user = [
      {
        id: 1,
        username: "Admin",
        role: "admin",
        email: "admin@admin.com",
        password: "valid-hash",
      },
    ];

    const token = "TOKEN";
    sinon.stub(SequelizeUser, "findOne").resolves(user as any);
    sinon.stub(bcrypt, "compare").resolves(true);
    sinon.stub(jwt, "sign").resolves(token);

    const { status, body } = await chai
      .request(app)
      .get("/login")
      .send(credentials);

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ token });
  });
});
