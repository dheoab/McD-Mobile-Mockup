const express = require("express");
const router = express.Router();

const Controller = require("../controllers/controllerApp");

// router.get("/dashboard", Controller.getTotal);

router.get("/items", Controller.readItems);
router.post("/items", Controller.postItems);
router.put("/items/:itemId", Controller.editItems);
router.get("/items/:itemId", Controller.readItemDetail);
router.delete("/items/:itemId", Controller.deleteItem);

// router.get("/categories", Controller.readCategories);
// router.post("/categories", Controller.postCategories);
// router.delete("/categories/:categoryId", Controller.deleteCategories);
// router.get("/categories/:categoryId", Controller.readCategoryDetail);
// router.put("/categories/:categoryId", Controller.editCategory);

// ===========================================================================================

// router.get("/public/items", Controller.readItemsClient);
// router.get("/public/items/:itemId", Controller.readItemClientDetail);
// router.get("/public/categories", Controller.readCategoriesClient);

module.exports = router;
