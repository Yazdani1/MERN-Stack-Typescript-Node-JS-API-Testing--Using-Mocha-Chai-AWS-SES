const axios = require("axios");

const API_URL = "http://localhost:5000/api/";


//create user

const createUser = async ()=>{

    const payload = {
        name: "Noor",
        email: "noor@gmail.com",
        age: 25,
      };
  
      const response = await axios.post(API_URL + "/postuser", payload);

      return response.data;

}




module.exports = {
    API_URL,
    createUser
}

