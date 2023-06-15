const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis(
  process.env.BASE_PORT_REDIS,
  process.env.BASE_URL_REDIS
);

const ITEMS_BASE_URL = process.env.ITEMS_BASE_URL || `http://localhost:4002`;
const USER_BASE_URL = process.env.USER_BASE_URL || `http://localhost:4001`;

const typeDefs = `#graphql
type Ingredient {
    id : Int,
    name : String,
}

type Category {
    id: Int,
    name: String
}

type Item {
    id : Int,
    name: String
    description: String
    price: Int,
    imgUrl: String
    authorId: String,
    categoryId: Int,
    stock: Int,
    Ingredients : [Ingredient],
    Category : Category
   
}


input newIngredients {
    ingredientName : String,    
}

input newItem {
    name: String
    description: String
    price: Int,
    imgUrl: String
    authorId: Int,
    categoryId: Int,
    
}

input editedItem {
    name: String
    description: String
    price: Int,
    imgUrl: String
    categoryId: Int,
}

input editedIngredients {
  ingredientName : String,    
}

type deleteItemResponse {
  statusCode : String,
  message : String

}

type updatedItemResponse {
  statusCode : String,
  data : Item
}

type Query {
    items : [Item],
    item(id: Int!) : Item
}


type Mutation {
    addItem(newItem : newItem, newIngredients : newIngredients) : Item
    deleteItem (itemId:Int!) : deleteItemResponse
    updateItem (itemId : Int!, item : editedItem, ingredient : editedIngredients) : updatedItemResponse
}
`;

const resolvers = {
  Query: {
    items: async () => {
      let itemsCache = await redis.get("items:get");

      let data;

      // if (itemsCache) {
      //   data = JSON.parse(itemsCache);

      //   console.log(data, "get All item schema dari ram");

      //   return data.data;
      // } else {
      const response = await axios.get(`${ITEMS_BASE_URL}/items`);
      data = response.data;

      redis.set("items:get", JSON.stringify(data));

      console.log(data, "get All item schema dari API");
      return data.data;
      // }
    },

    item: async (_, { id }) => {
      try {
        const response = await axios.get(`${ITEMS_BASE_URL}/items/${id}`);

        let data = response.data;

        const authorId = data.data.authorId;

        const responseUser = await axios.get(
          `${USER_BASE_URL}/users/${authorId}`
        );

        console.log(data, authorId, "xxxxxxxxx");
        let authorName = responseUser.data.data.username;

        data.data.authorId = authorName;

        return data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    addItem: async (_, args) => {
      const { newItem, newIngredients } = args;
      const { name, description, price, imgUrl, categoryId } = newItem;

      console.log(newItem);
      console.log(newIngredients);

      try {
        const { data } = await axios.post(`${ITEMS_BASE_URL}/items/`, {
          name: name,
          description: description,
          price: +price,
          imgUrl: imgUrl,
          categoryId: categoryId,
          ingredients: [newIngredients.ingredientName],
        });
        console.log(data, "data dari AddItem");
        redis.del("items:get");
        return data.data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteItem: async (_, { itemId }) => {
      try {
        const { data } = await axios.delete(
          `${ITEMS_BASE_URL}/items/${itemId}`
        );

        console.log(data);

        redis.del("items:get");
        redis.del(`itemId${itemId}:get`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    updateItem: async (_, args) => {
      const { item, ingredient } = args;
      const { name, description, price, imgUrl, categoryId } = item;

      console.log(item);
      console.log(ingredient);

      try {
        const { data } = await axios.put(
          `${ITEMS_BASE_URL}/items/${args.itemId}`,
          {
            name: name,
            description: description,
            price: +price,
            imgUrl: imgUrl,
            categoryId: categoryId,
            ingredients: [ingredient.ingredientName],
          }
        );
        console.log(data, "data dari editItem");

        redis.del("items:get");
        redis.del(`itemId${args.itemId}:get`);
        return data.data;
      } catch (error) {}
    },
  },
};

module.exports = { typeDefs, resolvers };
