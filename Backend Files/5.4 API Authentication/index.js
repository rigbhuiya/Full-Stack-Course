import express, { response } from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "riggy";
const yourPassword = "12345678";
const yourAPIKey = "aa994298-0cb2-446b-90c2-6a816d960c2b";
const yourBearerToken = "c43fe0d7-c2d4-4b29-8de7-7c270144c1b3";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
    const result = await axios.get(API_URL + "/random");
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
    const page=1;
    const result= await axios.get(API_URL+`/all?page=${page}`,{},{
      auth: {
        username: yourUsername,
        password: yourPassword,
      }
    })
    res.render("index.ejs", { content: JSON.stringify(result.data) });

})

app.get("/apiKey", async(req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  const result= await axios.get(API_URL+"/filter",{
    params: {
      apiKey: yourAPIKey,
      score:5
    }
  });
  res.render("index.ejs", { content: JSON.stringify(result.data) });
});

app.get("/bearerToken", async(req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  const result= await axios.get(API_URL+"/secrets/1",{
    headers: {
      Authorization:`Bearer ${yourBearerToken}`
    }
  });
  res.render("index.ejs", { content: JSON.stringify(result.data) });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
