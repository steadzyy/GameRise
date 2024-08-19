const { compareSync } = require("bcryptjs");
const { User, Game, Genre, MyGames } = require("../models");
const { signToken } = require("../helper/jwt");
const { where } = require("sequelize");
const { OAuth2Client } = require("google-auth-library");
const { Hooks } = require("sequelize/lib/hooks");
const  midtransClient = require('midtrans-client')
const client = new OAuth2Client();
const gemini = require("../helper/geminiAI");

class Controller {
  static async getBuyTicket (req, res,next){
    try {
      
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  static async initiatePayment(req, res, next) {
    try {
      let {id} = req.body
      // console.log(req.body, 'WOY PLIS');
      let games = await Game.findByPk(+id);
      // console.log(`masokkkk11111111111`);
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-dY_Fq1QjYgj_WTx70RaITCqt",
      });
      // console.log(snap,`-----------------------------`);
      // console.log(req.user, `-----------------------------------------------<`);
      const order_id = Math.random().toString();
      let parameter = {
        //data detail order
        transaction_details: {
          order_id: order_id,
          gross_amount: games.price,
        },
        //data jenis pembayaran
        credit_card: {
          secure: true,
        },
        //data detail customer

        customer_details: {
          first_name: req.user.username,
          email: req.user.email,
          phone: "08111222333",
        },
      };

      const transaction = await snap.createTransaction(parameter);
      // console.log(transaction, `123-----------------------`);
      const transactionToken = transaction.token;

      res
        .status(200)
        .json({ message: "Order created", transactionToken, order_id });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updatePayment(req, res, next) {
    try {
        // console.log(req.params.id);
        // const {order_id} = req.body
        // console.log("masuk?");
        // console.log(req.params,`--------------------------`);
        // const MyGames = await MyGames.findByPk(id);
        // if (MyGames.paymentStatus === "pending") throw { name: "AlreadyPaid" };
        // console.log(req.body, "/////////////////////////////////////////");
        
        const { id } = req.body
        await MyGames.create({
          UserId: req.user.id,
          GameId: id,
          status: "Success",
        });
        const data = await MyGames.findByPk(req.params.id)

        // console.log(data, "<<<<<<<<<<<<<<<<DATA");

        // const user = await User.findOne({ where: { id: data.UserId } });
        // if (!user) throw { name: "InvalidEmail" };
        // console.log(user);

        res.status(201).json({ message: "Pembayaran berhasil" });
    } catch (error) {
        next(error)
    }
}

  static async getAllUser(req, res, next) {
    try {
      let user = await User.findAll();
      if (!user) {
        throw { name: "User not found" };
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      const { username, email, password, role } = req.body;
      let user = await User.create(req.body);
      if (!email) {
        throw { name: "Invalid email format" };
      }
      res.status(201).json({
        user: user,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email) {
        throw { name: "Invalid email/password" };
      }
      let data = await User.findOne({
        where: {
          email: email,
        },
      });
      let compare = compareSync(password, data.password);
      if (!compare) {
        throw { name: "Invalid email/password" };
      }
      let access_token = signToken(data);
      res.status(200).json({ access_token, role: data.role });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      console.log(req.body, "<<<<< cont.GoogleLogin");
      const ticket = await client.verifyIdToken({
        idToken: req.body.googleToken,
        audience:
          "49127258763-1sqdv8gai2aos53kg42m6koaemrunv5a.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      console.log(payload, "<<<");
      // const userid = payload['sub'];
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        hooks: false,
        defaults: {
          username: payload.name,
          email: payload.email,
          password: Math.random().toString(),
          role: "Player",
        },
      });
      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
    }
  }

  //Public
  static async getAllGamesPublic(req, res, next) {
    try {
      const paramsQuerySQL = {};
      let game = await Game.findAll({
        paramsQuerySQL,
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Genre,
          },
        ],
      });
      if (!game) {
        throw { name: "Games not found" };
      }
      res.status(200).json(game);
    } catch (error) {
      next(error);
    }
  }
  static async getAllGamesPublicById(req, res, next) {
    try {
      let { id } = req.params;
      let games = await Game.findByPk(id);
      if (!games) {
        throw { name: "Games not found" };
      }
      res.status(200).json(games);
    } catch (error) {
      next(error);
    }
  }

  //GEMINIAI
  static async geminiAi(req, res) {
    try {
      const { id } = req.params;

      const game = await Game.findByPk(id);
      console.log(game, id);

      let data = await gemini(game.title);
      console.log(data, "<<<<<");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Internal Error" });
    }
  }
  //Games
  // static async cek(req, res){
  //   try {
  //     console.log(req.body, 'FAREL');
  //     let data = await MyGames.create(
  //      req.body
  //     )
  //     res.status(201).json(data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  static async buyGames(req, res, next) {
    try {
      // console.log(req.params, req.user, "uhuyyyyy gesss");
      // console.log(req.body, "--------");
      let { id } = req.params;
      let games = await Game.findByPk(id);

      if (!games) {
        throw { name: "Games not found" };
      }
      // let data = MyGame.findAll()
      // console.log(data, 'INI KOSONG');
      let data1 = await MyGames.create({
        UserId: req.user.id,
        GameId: id,
        status: "Pending",
      });
      console.log(data1);
      res.status(200).json(data1);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getAllGames(req, res, next) {
    try {
      const paramsQuerySQL = {};
      let game = await Game.findAll({
        paramsQuerySQL,
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Genre,
          },
        ],
      });
      if (!game) {
        throw { name: "Games not found" };
      }
      res.status(200).json(game);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async addGames(req, res, next) {
    try {
      let { title, description, price, imageUrl, GenreId } = req.body;
      let game = await Game.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        GenreId: GenreId,
        UserId: req.user.id,
      });
      res.status(201).json(game);
    } catch (error) {
      next(error);
    }
  }
  static async getGamesById(req, res, next) {
    try {
      let { id } = req.params;
      let games = await Game.findByPk(id);
      if (!games) {
        throw { name: "Games not found" };
      }
      res.status(200).json(games);
    } catch (error) {
      next(error);
    }
  }
  static async updateGamesById(req, res, next) {
    try {
      let { id } = req.params;
      let games = await Game.findByPk(id);
      if (!games) {
        throw { name: "Games not found" };
      }
      await games.update(req.body, {
        where: {
          id: id,
        },
      });
      res.status(200).json(games);
    } catch (error) {
      next(error);
    }
  }
  static async deleteGamesById(req, res, next) {
    try {
      let { id } = req.params;
      let games = await Game.findByPk(id);
      if (!games) {
        throw { name: "Games not found" };
      }
      await games.destroy({
        where: {
          id: id,
        },
      });
      res
        .status(200)
        .json({ message: `Games with id ${games.id} successfully deleted` });
    } catch (error) {
      next(error);
    }
  }

  //Genre
  static async getAllGenre(req, res, next) {
    try {
      let genre = await Genre.findAll();
      if (!genre) {
        throw { name: "Genre not found" };
      }
      res.status(200).json(genre);
    } catch (error) {
      next(error);
    }
  }
  static async addGenre(req, res, next) {
    try {
      req.body.UserId = req.user.id;
      let genre = await Genre.create({
        ...req.body,
        UserId: req.user.id,
      });
      res.status(201).json(genre);
    } catch (error) {
      next(error);
    }
  }
  static async getGenreById(req, res, next) {
    try {
      let { id } = req.params;
      let genre = await Genre.findByPk(id);
      if (!genre) {
        throw { name: "Genre not found" };
      }
      res.status(200).json(genre);
    } catch (error) {
      next(error);
    }
  }
  static async updateGenreById(req, res, next) {
    try {
      let { id } = req.params;
      let genre = await Genre.findByPk(id);
      if (!genre) {
        throw { name: "Genre not found" };
      }
      await genre.update(req.body, {
        where: {
          id: id,
        },
      });
      res.status(200).json(genre);
    } catch (error) {
      next(error);
    }
  }
  static async deleteGenreById(req, res, next) {
    try {
      let { id } = req.params;
      let genre = await Genre.findByPk(id);
      if (!genre) {
        throw { name: "Genre not found" };
      }
      await genre.destroy({
        where: {
          id: id,
        },
      });
      res
        .status(200)
        .json({ message: `Genre with id ${genre.id} successfully deleted` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
