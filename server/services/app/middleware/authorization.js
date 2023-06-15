const { User, Category, Product } = require("../models/index");

const authZ = async (req, res, next) => {
  try {
    const userRole = req.userData.userRole;
    const userId = req.userData.userId;
    const productId = +req.params.productId;

    const detailedProduct = await Product.findByPk(productId);

    if (!detailedProduct) {
      throw { name: "notFound" };
    }

    console.log(req.userData, "authz call");

    if (userRole === "admin") {
      next();
    } else if (userRole === "staff" && detailedProduct.authorId === userId) {
      next();
    } else {
      throw { name: "forbidden" };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authZ;
