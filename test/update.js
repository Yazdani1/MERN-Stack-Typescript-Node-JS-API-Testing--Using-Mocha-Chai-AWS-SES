const expect = require("chai").expect;
const { before } = require("mocha");
const axios = require("axios");
let chai = require("chai");
let should = chai.should();

let user = undefined;

const { API_URL, createUser } = require("./test_utils");

before(async () => {
  
    user = await createUser();

});

describe("Update User", function () {
  it("Update User Correctly", async () => {
    const response = await axios.put(API_URL + "/updateuser/" + user._id, {
      name: "Noor to yaz updated",
      email: "noor_updated@gmail.com",
      age: 15,
    });

    expect(response.status).to.be.equal(200);
    expect(response.data).to.be.an("object");
  });

  it("Update User Name Correctly", async () => {
    const response = await axios.put(API_URL + "/updateuser/" + user._id, {
      name: "Noor to yaz updated",
    });

    expect(response.status).to.be.equal(200);
    expect(response.data).to.be.an("object");
  });

  it("Update User Age Correctly", async () => {
    const response = await axios.put(API_URL + "/updateuser/" + user._id, {
      age: 52,
    });

    expect(response.status).to.be.equal(200);
    expect(response.data).to.be.an("object");
  });

  it("Update User Correctly With Wrong User ID", async () => {
    try {
      const response = await axios.put(API_URL + "/updateuser/" + 45, {
        name: "Noor to yaz updated",
        email: "noor_updated@gmail.com",
        age: 15,
      });

      expect(response.status).not.to.be.equal(200);
      expect(response.data).to.be.an("object");
    } catch (error) {
      if (error.response) {
        expect(error.response.status).not.to.be.equal(200);
      } else {
        throw error;
      }
    }
  });
});

// describe("Number Test",function(){

//     it("Tow numbers",function(){

//         let first =10;
//         let second =10;

//         expect(first).to.be.equal(second);

//     }),

//     it("numbers",function(){

//         let first =10;
//         let second =100;

//         expect(first).not.to.be.equal(second);

//     })

// })
