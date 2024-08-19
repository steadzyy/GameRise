if(process.env.NODE_ENV !== "production"){
  require("dotenv").config()
}

const express = require("express");
const errorHandle = require("./middleware/errorHandle");
const app = express();
const port = 3003;
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const cors = require('cors');
app.use(cors())
app.use("/", require("./routes"));

app.use(errorHandle)


module.exports = app;

/** MIGRATE
 * npx sequelize-cli model:generate --name User --attributes userName:string,email:string,password:string,role:string
 * 
 * npx sequelize-cli model:generate --name User --attributes userName:string,email:string,password:string,role:string
 *
 * npx sequelize-cli model:generate --name Genre --attributes name:string
 *
 * npx sequelize-cli model:generate --name Game --attributes title:string,description:string,price:string,imageUrl:string,GenreId:integer
 *
 * npx sequelize-cli model:generate --name UserGenre --attributes GenreId:integer,UserId:integer
 */
/**SEED
 * npx sequelize seed:generate --name seed-Users
 *
 * npx sequelize seed:generate --name seed-Genres
 *
 * npx sequelize seed:generate --name seed-Games *
 *
 * npx sequelize seed:generate --name seed-UserGenres
 */
