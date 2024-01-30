import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db= new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "azkb7911",
  port: 5432
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/add",async (req,res)=>{

  const country=req.body.country;
  const result= await db.query("select country_code from countries where country_name= $1",[country]);
  const data=result.rows;
  if(data.length>0){
    const countryCode=data[0].country_code;
    console.log(countryCode);
    db.query("INSERT INTO visited_countries (country_code) VALUES ($1)",[countryCode]);

  }  
  res.redirect("/");

})

app.get("/", async (req, res) => {
  const result= await db.query("SELECT country_code FROM visited_countries");
  let countries=[];
  result.rows.forEach(row=>{
    countries.push(row.country_code);
  });
  res.render("index.ejs", {countries : countries, total:countries.length})
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
