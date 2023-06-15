import { gql } from "@apollo/client";

export const GET_MENUS = gql`
  query Items {
    items {
      id
      name
      description
      price
      imgUrl
      authorId
      categoryId
      stock
    }
  }
`;

export const GET_MENU_BY_ID = gql`
  query Items($itemId: Int!) {
    item(id: $itemId) {
      id
      name
      description
      price
      imgUrl
      authorId
      categoryId
      stock
      Ingredients {
        id
        name
      }
      Category {
        id
        name
      }
    }
  }
`;
