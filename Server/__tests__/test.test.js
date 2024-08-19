const request = require("supertest");
const app = require("../app");
const { User, Game } = require("../models");
const { signToken } = require("../helper/jwt");

let token;

beforeAll(async () => {
  let user = await User.create({
    username: "steadzyy",
    email: "bayua@gmail.com",
    password: "12345",
    role: "Developer",
  });
  token = signToken({ id: user.id });

  let game = await Game.create({
    title: "GTA Original",
    description:
      "Grand Theft Auto : Chinatown is an open-world action game in which players assume the role of Huang Lee, a triad gang member who must recover a stolen item and gain revenge in the fictional setting of Liberty City.",
    price: 20000000,
    imageUrl:
      "https://cdn1.epicgames.com/0584d2013f0149a791e7b9bad0eec102/offer/GTAV_EGS_Artwork_2560x1440_Landscaped Store-2560x1440-79155f950f32c9790073feaccae570fb.jpg",
  });
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Register", () => {
  test("Register Account", async () => {
    let response = await request(app).post("/register").send({
      username: "steadzyy",
      email: "bayua@gmail.com",
      password: "12345",
      role: "Developer",
    });
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.user).toHaveProperty("username", "steadzyy");
  });

  test("Register Account With Missing Property", async () => {
    let response = await request(app).post("/register").send({
      username: "",
      email: "bayua@gmail.com",
      password: "12345",
      role: "Developer",
    });
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "username cannot be an empty string"
    );
  });
});

describe("Login", () => {
  test("Login with Developer account", async () => {
    let response = await request(app)
      .post("/login")
      .send({ email: "bayua@gmail.com", password: "12345" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });

  test("Login with empty email", async () => {
    let response = await request(app)
      .post("/login")
      .send({ email: "", password: "12345" });
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid email/password");
  });

  test("Login with empty password", async () => {
    let response = await request(app)
      .post("/login")
      .send({ email: "bayua@gmail.com", password: "" });
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid email/password");
  });

  test("Login with wrong password", async () => {
    let response = await request(app)
      .post("/login")
      .send({ email: "bayua@gmail.com", password: "6789" });
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid email/password");
  });
});

describe(" Add Game", () => {
  test("Successfully add Games", async () => {
    let newGame = {
      title: "GTAaaa",
      description:
        "Grand Theft Auto : Chinatown is an open-world action game in which players assume the role of Huang Lee, a triad gang member who must recover a stolen item and gain revenge in the fictional setting of Liberty City.",
      price: 20050000,
      imageUrl:
        "https://cdn1.epicgames.com/0584d2013f0149a791e7b9bad0eec102/offer/GTAV_EGS_Artwork_2560x1440_Landscaped Store-2560x1440-79155f950f32c9790073feaccae570fb.jpg",
    };

    let response = await request(app)
      .post("/games")
      .send(newGame)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("Update Game", () => {
  test("Update an existing Game", async () => {
    let updatedGame = {
      title: "GTA Edit",
      description: "Updated description for GTA Edit.",
      price: 25000000,
      imageUrl: "https://cdn.example.com/gta_edit.jpg",
    };

    let response = await request(app)
      .put(`/games/1`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedGame);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("Delete Game", () => {
  test("Failed delete 'Games' because Games is undefined", async () => {
    let gamee = {
      title: "GTA Edit",
      description: "Updated description for GTA Edit.",
      price: 25000000,
      imageUrl: "https://cdn.example.com/gta_edit.jpg",
    };
    let user = await request(app)
      .delete("/products/1")
      .send(gamee)
      .set("Authorization", `Bearer ${token}`);
    expect(user.status).toBe(404);
    expect(user.body).toBeInstanceOf(Object);
  });
});

describe("Get Games", () => {
  test("/Get/Games", async () => {
    let response = await request(app).get("/pub/games");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("Get Games", () => {
  test("/Get/Genre", async () => {
    let response = await request(app).get("/genre").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});
