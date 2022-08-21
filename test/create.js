const expect = require("chai").expect;
const { before } = require("mocha");
const axios = require("axios");
let chai = require("chai");
let should = chai.should();

let user = undefined;

const { API_URL, createUser } = require("./test_utils");

before(async () => {
  user = await createUser();

  console.log(user.name);
});

describe("Get User", function () {

  it("Get All The List of Users", async () => {
    const response = await axios.get(API_URL + "/getuserlist");
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an("array");
  });

  it("Get Single User",async()=>{
    const response = await axios.get(API_URL + "/singleuser/"+ user._id);
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an("object");
  });

  it("Get Single User With All The Fields",async()=>{
    const response = await axios.get(API_URL + "/singleuser/"+ user._id);
    expect(response.data.name).to.be.equal("Noor");
    response.data.should.have.property('name');
    response.data.should.have.property('age');
    response.data.should.have.property('email');
  });

});

describe("Create User", function () {
  it("Create User Correctly", async () => {

    const payload = {
      name: "Muller",
      email: "muller@gmail.com",
      age: 45,
    };

    const response = await axios.post(API_URL + "/postuser", payload);

    expect(response.status).to.equal(201);

    expect(response.data).to.be.an("object");
  });

  


  it("Should not Create User Without Adding Name", async () => {
    try {
        
      const payload = {
        email: "muller@gmail.com",
        age:45
      };

      const response = await axios.post(API_URL + "/postuser", payload);

      expect(response.status).not.to.be.equal(201);
      expect(response.data).to.be.an("object");
    } catch (error) {
      if (error.response) {
        expect(error.response.status).not.to.be.equal(201);
      } else {
        throw error;
      }
    }
  });

  it("Should not Create User Without Adding Email", async () => {
    try {
      const payload = {
        name: "Jon kery",
        age:45
      };
      const response = await axios.post(API_URL + "/postuser", payload);
      expect(response.status).not.to.be.equal(201);
      expect(response.data).to.be.an("object");
    } catch (error) {
      if (error.response) {
        expect(error.response.status).not.to.be.equal(201);
      } else {
        throw error;
      }
    }
  });

  it("Should not Create user without adding age", async () => {
    try {
      const payload = {
        name: "Jon kery",
        email: "muller@gmail.com",
        // age:45
      };

      const response = await axios.post(API_URL + "/postuser", payload);

      expect(response.status).not.to.be.equal(201);
      expect(response.data).to.be.an("object");
    } catch (error) {
      if (error.response) {
        expect(error.response.status).not.to.be.equal(201);
      } else {
        throw error;
      }
    }
  });

});


describe("Delete Single User", function () {
  it("Delete user", async () => {
    const response = await axios.delete(API_URL + "/deleteuser/" + user._id);
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an("object");
  });
});
