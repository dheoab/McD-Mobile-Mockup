const Redis = require("ioredis");
const axios = require("axios");

const redis = new Redis(6379, "127.0.0.1");

const APP_SERVER_URL = process.env.APP_SERVER_URL || "http://localhost:4040";

class Controller {
  static async postItems(req, res, next) {
    try {
      let { name, description, price, imgUrl, categoryId, ingredients } =
        req.body;

      const response = await axios.post(`${APP_SERVER_URL}/items/`, {
        name,
        description,
        price,
        imgUrl,
        categoryId,
        ingredients,
      });

      redis.del("items:get");

      res.status(201).json({
        statusCode: 201,
        data: response.data,
      });
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async readItems(req, res, next) {
    try {
      let itemsCache = await redis.get("items:get");

      let data;

      if (itemsCache) {
        data = JSON.parse(itemsCache);

        return res.status(200).json(data);
      } else {
        const response = await axios.get(`${APP_SERVER_URL}/items`);
        data = response.data;

        redis.set("items:get", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async editItems(req, res, next) {
    try {
      let { itemId } = req.params;

      let { name, description, price, stock, imgUrl, categoryId, ingredients } =
        req.body;

      const response = await axios.put(`${APP_SERVER_URL}/items/${itemId}`, {
        name,
        description,
        price,
        stock,
        imgUrl,
        categoryId,
        ingredients,
      });

      res.status(201).json({
        statusCode: 201,
        data: response.data,
      });
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async readItemDetail(req, res, next) {
    try {
      const { itemId } = req.params;

      let itemCache = await redis.get(`itemId${itemId}:get`);

      let data;

      if (itemCache) {
        data = JSON.parse(itemCache);

        console.log("dari If", data);

        return res.status(200).json(data);
      } else {
        const response = await axios.get(`${APP_SERVER_URL}/items/${itemId}`);
        data = response.data;

        console.log("dari Else");

        redis.set(`itemId${itemId}:get`, JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async deleteItem(req, res, next) {
    try {
      const { itemId } = req.params;

      await axios.delete(`${APP_SERVER_URL}/items/${itemId}`);

      redis.del("items:get");

      res.status(200).json({
        message: "Delete successfull",
      });
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  // static async readCategories(req, res, next) {
  //   try {
  //     const categories = await Category.findAll();

  //     if (!categories) {
  //       throw { name: "notFound" };
  //     }

  //     res.status(200).json({
  //       statusCode: 200,
  //       data: categories,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async readCategoryDetail(req, res, next) {
  //   try {
  //     const { categoryId } = req.params;

  //     const category = await Category.findOne({
  //       where: {
  //         id: categoryId,
  //       },
  //     });

  //     if (!category) {
  //       throw { name: "notFound" };
  //     }
  //     res.status(200).json({
  //       statusCode: 200,
  //       data: category,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  // // static async register(req, res, next) {
  // //   try {
  // //     const { username, password, email, phoneNumber, address } = req.body;
  // //     const newUser = await User.create({
  // //       username: username,
  // //       password: password,
  // //       email: email,
  // //       phoneNumber: phoneNumber,
  // //       address: address,
  // //     });

  // //     const returnData = {
  // //       id: newUser.id,
  // //       username: newUser.username,
  // //       email: newUser.email,
  // //     };

  // //     res.status(201).json({
  // //       statusCode: 201,
  // //       data: returnData,
  // //     });
  // //   } catch (error) {
  // //     next(error);
  // //   }
  // // }

  // // static async adminLogin(req, res, next) {
  // //   try {
  // //     const { username, password } = req.body;

  // //     console.log(req.body, "ini reqBody login");

  // //     const user = await User.findOne({
  // //       where: {
  // //         username: username,
  // //       },
  // //     });

  // //     if (!user) {
  // //       throw { name: "userOrPassNotFound" };
  // //     }

  // //     const isValidated = comparePassword(password, user.password);

  // //     if (!isValidated) {
  // //       throw { name: "userOrPassNotFound" };
  // //     }

  // //     let access_token = createToken({
  // //       id: user.id,
  // //       username: user.username,
  // //     });

  // //     res.status(200).json({
  // //       statusCode: 200,
  // //       userId: user.id,
  // //       userRole: user.role,
  // //       username: user.username,
  // //       access_token: access_token,
  // //     });
  // //   } catch (error) {
  // //     next(error);
  // //   }
  // // }

  // //   static async googleLogin(req, res, next) {
  // //     try {
  // //       const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  // //       const ticket = await client.verifyIdToken({
  // //         idToken: req.headers.google_token,
  // //         audience: process.env.GOOGLE_CLIENT_ID,
  // //       });
  // //       const payload = ticket.getPayload();
  // //       const createUser = await User.findOrCreate({
  // //         where: {
  // //           email: payload.email,
  // //         },
  // //         defaults: {
  // //           username: payload.name.replaceAll(" ", ""),
  // //           email: payload.email,
  // //           password: payload.nbf,
  // //           // password: process.env.DEFAULT_PASSWORD,
  // //           role: "staff",
  // //           phoneNumber: null,
  // //           address: null,
  // //         },
  // //         hooks: false,
  // //       });

  // //       let newUser = createUser[0];

  // //       const access_token = createToken({
  // //         id: newUser.id,
  // //         username: newUser.username,
  // //       });

  // //       res.status(201).json({
  // //         statusCode: 201,
  // //         access_token: access_token,
  // //         userId: newUser.id,
  // //         userRole: newUser.role,
  // //         username: newUser.username,
  // //       });
  // //     } catch (error) {
  // //       next(error);
  // //     }
  // //   }

  // static async postCategories(req, res, next) {
  //   try {
  //     let { name } = req.body;

  //     const newCategory = await Category.create({
  //       name: name,
  //     });

  //     res.status(201).json({
  //       statusCode: 201,
  //       data: newCategory,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async deleteCategories(req, res, next) {
  //   try {
  //     const categoryId = +req.params.categoryId;

  //     const deletedCategory = await Category.findOne({
  //       where: {
  //         id: categoryId,
  //       },
  //     });

  //     if (!deletedCategory) {
  //       throw { name: "notFound" };
  //     }

  //     await Category.destroy({
  //       where: {
  //         id: categoryId,
  //       },
  //     });

  //     res.status(200).json({
  //       statusCode: 200,
  //       message: `${deletedCategory.name} success to delete`,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async editCategory(req, res, next) {
  //   try {
  //     let categoryId = req.params.categoryId;

  //     let { name } = req.body;

  //     console.log(categoryId, name);

  //     let category = await Category.findByPk(categoryId);

  //     if (!category) {
  //       throw { name: "notFound" };
  //     }

  //     await Category.update(
  //       {
  //         name: name,
  //       },
  //       {
  //         where: {
  //           id: categoryId,
  //         },
  //       }
  //     );

  //     let editCategory = await Category.findByPk(categoryId);

  //     res.status(201).json({
  //       statusCode: 201,
  //       name: editCategory.name,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async addIngredient(req, res, next) {
  //   try {
  //     let { name, itemId } = req.body;

  //     let { access_token } = req.headers;

  //     if (!access_token) {
  //       throw { name: "notLogged" };
  //     }

  //     const newIngredient = await Ingredient.create({
  //       name: name,
  //       itemId: itemId,
  //     });

  //     res.status(201).json({
  //       statusCode: 201,
  //       data: newIngredient,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async deleteIngredient(req, res, next) {
  //   try {
  //   } catch (error) {}
  // }

  // static async editIngredient(req, res, next) {
  //   try {
  //   } catch (error) {}
  // }

  // static async getTotal(req, res, next) {
  //   try {
  //     const totalItem = await Item.count();
  //     const totalCategory = await Category.count();
  //     const totalIngredient = await Ingredient.count();

  //     res.status(200).json({
  //       statusCode: 200,
  //       data: {
  //         totalItem,
  //         totalCategory,
  //         totalIngredient,
  //       },
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // // ==================================================================================================

  // static async readItemsClient(req, res, next) {
  //   try {
  //     let products = await Item.findAll({
  //       include: [Category, Ingredient],
  //       order: [["name", "ASC"]],
  //     });

  //     if (!products) {
  //       throw { name: "notFound" };
  //     }

  //     res.status(200).json({
  //       statusCode: 200,
  //       data: products,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async readItemClientDetail(req, res, next) {
  //   try {
  //     const itemId = req.params.itemId;

  //     const selectedItem = await Item.findOne({
  //       where: {
  //         id: itemId,
  //       },
  //       include: [Ingredient],
  //     });

  //     if (!selectedItem) {
  //       throw { name: "notFound" };
  //     }

  //     res.status(200).json({
  //       statusCode: 200,
  //       data: selectedItem,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async readCategoriesClient(req, res, next) {
  //   try {
  //     const categories = await Category.findAll();

  //     if (!categories) {
  //       throw { name: "notFound" };
  //     }

  //     res.status(200).json({
  //       statusCode: 200,
  //       data: categories,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //   }
  // }
}

module.exports = Controller;
