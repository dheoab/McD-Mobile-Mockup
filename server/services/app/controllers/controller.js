const {
  Category,
  Item,
  Ingredient,
  sequelize,
  Sequelize,
} = require("../models/index");
const { comparePassword } = require("../helpers/encryption");
const { createToken, verifyToken } = require("../helpers/jwt");

class Controller {
  static async postItems(req, res, next) {
    const t = await sequelize.transaction();

    try {
      let { name, description, price, imgUrl, categoryId, ingredients } =
        req.body;

      console.log(req.body, "ini req body");

      let newItem = await Item.create(
        {
          name: name,
          description: description,
          price: +price,
          imgUrl: imgUrl,
          // authorId: "admin",
          categoryId: categoryId,
        },
        { transaction: t }
      );

      const ingredientsArray = ingredients.map((ingredient) => ({
        name: ingredient,
        itemId: newItem.id,
      }));

      console.log(ingredientsArray, "ARRAY");

      const responseIngredient = await Ingredient.bulkCreate(ingredientsArray, {
        transaction: t,
      });

      console.log(responseIngredient, "item yang baru dibuat");
      console.log(newItem.id, "idddddddddd");

      await t.commit();

      const newItems = await Item.findOne(
        {
          where: {
            id: newItem.id,
          },
          include: [Ingredient],
        },
        { transaction: t }
      );
      console.log(newItems, "newItem With Ingdredients");
      res.status(201).json({
        statusCode: 201,
        data: newItems,
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async readItems(req, res, next) {
    try {
      let items = await Item.findAll({
        include: [{ model: Category }, { model: Ingredient }],
        order: [["id", "ASC"]],
      });

      if (!items) {
        throw { name: "notFound" };
      }

      console.log(items, "dari findAllItem");

      res.status(200).json({
        statusCode: 200,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editItems(req, res, next) {
    const t = await sequelize.transaction();

    try {
      let itemId = req.params.itemId;

      let { name, description, price, stock, imgUrl, categoryId, ingredients } =
        req.body;

      console.log(req.body, "edit");

      let selectedItem = await Item.findByPk(itemId);

      if (!selectedItem) {
        throw { name: "notFound" };
      }

      await Ingredient.destroy(
        {
          where: {
            itemId: itemId,
          },
        },
        { transaction: t }
      );

      await Item.update(
        {
          name: name,
          description: description,
          price: price,
          stock: stock,
          imgUrl: imgUrl,
          categoryId: categoryId,
        },
        {
          where: {
            id: itemId,
          },
        },
        { transaction: t }
      );

      const ingredientsArray = ingredients.map((ingredient) => ({
        name: ingredient,
        itemId: itemId,
      }));

      console.log(ingredientsArray, "ARRAY");

      const responseIngredient = await Ingredient.bulkCreate(ingredientsArray, {
        transaction: t,
      });

      await t.commit();

      let editedItem = await Item.findOne({
        where: {
          id: itemId,
        },
        include: [Ingredient],
      });

      res.status(201).json({
        statusCode: 201,
        data: editedItem,
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async readItemDetail(req, res, next) {
    try {
      const itemId = req.params.itemId;

      const selectedItem = await Item.findOne({
        where: {
          id: itemId,
        },
        include: [Ingredient],
      });

      if (!selectedItem) {
        throw { name: "notFound" };
      }

      res.status(200).json({
        statusCode: 200,
        data: selectedItem,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteItem(req, res, next) {
    try {
      const itemId = req.params.itemId;

      console.log("masuk delete");

      const selectedItem = await Item.findOne({
        where: {
          id: itemId,
        },
      });

      if (!selectedItem) {
        throw { name: "notFound" };
      }

      await Item.destroy({
        where: {
          id: itemId,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: `${selectedItem.name} success to delete`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readCategories(req, res, next) {
    try {
      const categories = await Category.findAll();

      if (!categories) {
        throw { name: "notFound" };
      }

      res.status(200).json({
        statusCode: 200,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readCategoryDetail(req, res, next) {
    try {
      const { categoryId } = req.params;

      const category = await Category.findOne({
        where: {
          id: categoryId,
        },
      });

      if (!category) {
        throw { name: "notFound" };
      }
      res.status(200).json({
        statusCode: 200,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }
  // static async register(req, res, next) {
  //   try {
  //     const { username, password, email, phoneNumber, address } = req.body;
  //     const newUser = await User.create({
  //       username: username,
  //       password: password,
  //       email: email,
  //       phoneNumber: phoneNumber,
  //       address: address,
  //     });

  //     const returnData = {
  //       id: newUser.id,
  //       username: newUser.username,
  //       email: newUser.email,
  //     };

  //     res.status(201).json({
  //       statusCode: 201,
  //       data: returnData,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async adminLogin(req, res, next) {
  //   try {
  //     const { username, password } = req.body;

  //     console.log(req.body, "ini reqBody login");

  //     const user = await User.findOne({
  //       where: {
  //         username: username,
  //       },
  //     });

  //     if (!user) {
  //       throw { name: "userOrPassNotFound" };
  //     }

  //     const isValidated = comparePassword(password, user.password);

  //     if (!isValidated) {
  //       throw { name: "userOrPassNotFound" };
  //     }

  //     let access_token = createToken({
  //       id: user.id,
  //       username: user.username,
  //     });

  //     res.status(200).json({
  //       statusCode: 200,
  //       userId: user.id,
  //       userRole: user.role,
  //       username: user.username,
  //       access_token: access_token,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  //   static async googleLogin(req, res, next) {
  //     try {
  //       const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  //       const ticket = await client.verifyIdToken({
  //         idToken: req.headers.google_token,
  //         audience: process.env.GOOGLE_CLIENT_ID,
  //       });
  //       const payload = ticket.getPayload();
  //       const createUser = await User.findOrCreate({
  //         where: {
  //           email: payload.email,
  //         },
  //         defaults: {
  //           username: payload.name.replaceAll(" ", ""),
  //           email: payload.email,
  //           password: payload.nbf,
  //           // password: process.env.DEFAULT_PASSWORD,
  //           role: "staff",
  //           phoneNumber: null,
  //           address: null,
  //         },
  //         hooks: false,
  //       });

  //       let newUser = createUser[0];

  //       const access_token = createToken({
  //         id: newUser.id,
  //         username: newUser.username,
  //       });

  //       res.status(201).json({
  //         statusCode: 201,
  //         access_token: access_token,
  //         userId: newUser.id,
  //         userRole: newUser.role,
  //         username: newUser.username,
  //       });
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  static async postCategories(req, res, next) {
    try {
      let { name } = req.body;

      const newCategory = await Category.create({
        name: name,
      });

      res.status(201).json({
        statusCode: 201,
        data: newCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategories(req, res, next) {
    try {
      const categoryId = +req.params.categoryId;

      const deletedCategory = await Category.findOne({
        where: {
          id: categoryId,
        },
      });

      if (!deletedCategory) {
        throw { name: "notFound" };
      }

      await Category.destroy({
        where: {
          id: categoryId,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: `${deletedCategory.name} success to delete`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editCategory(req, res, next) {
    try {
      let categoryId = req.params.categoryId;

      let { name } = req.body;

      console.log(categoryId, name);

      let category = await Category.findByPk(categoryId);

      if (!category) {
        throw { name: "notFound" };
      }

      await Category.update(
        {
          name: name,
        },
        {
          where: {
            id: categoryId,
          },
        }
      );

      let editCategory = await Category.findByPk(categoryId);

      res.status(201).json({
        statusCode: 201,
        name: editCategory.name,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addIngredient(req, res, next) {
    try {
      let { name, itemId } = req.body;

      let { access_token } = req.headers;

      if (!access_token) {
        throw { name: "notLogged" };
      }

      const newIngredient = await Ingredient.create({
        name: name,
        itemId: itemId,
      });

      res.status(201).json({
        statusCode: 201,
        data: newIngredient,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteIngredient(req, res, next) {
    try {
    } catch (error) {}
  }

  static async editIngredient(req, res, next) {
    try {
    } catch (error) {}
  }

  static async getTotal(req, res, next) {
    try {
      const totalItem = await Item.count();
      const totalCategory = await Category.count();
      const totalIngredient = await Ingredient.count();

      res.status(200).json({
        statusCode: 200,
        data: {
          totalItem,
          totalCategory,
          totalIngredient,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // ==================================================================================================

  static async readItemsClient(req, res, next) {
    try {
      let products = await Item.findAll({
        include: [Category, Ingredient],
        order: [["name", "ASC"]],
      });

      if (!products) {
        throw { name: "notFound" };
      }

      res.status(200).json({
        statusCode: 200,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readItemClientDetail(req, res, next) {
    try {
      const itemId = req.params.itemId;

      const selectedItem = await Item.findOne({
        where: {
          id: itemId,
        },
        include: [Ingredient],
      });

      if (!selectedItem) {
        throw { name: "notFound" };
      }

      res.status(200).json({
        statusCode: 200,
        data: selectedItem,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readCategoriesClient(req, res, next) {
    try {
      const categories = await Category.findAll();

      if (!categories) {
        throw { name: "notFound" };
      }

      res.status(200).json({
        statusCode: 200,
        data: categories,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
