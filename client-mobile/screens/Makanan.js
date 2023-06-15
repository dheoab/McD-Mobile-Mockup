import { useQuery } from "@apollo/client";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { GET_MENUS } from "../queries/query";

const cardData = [
  {
    id: 1,
    name: "Big Mac",
    description:
      "Burger Ikonik McDonald's. Dua lapis daging sapi gurih disajikan dengan saus spesial, selada segar, keju, acar timun, bawang, diapit roti bertabur wijen",
    price: 40000,
    imgUrl:
      "https://nos.jkt-1.neo.id/mcdonalds/foods/October2019/nhj93oZApoMavF1lC6Wm.png",
    authorId: 1,
    categoryId: 1,
    category: "BURGERS",
    stock: 999,
  },
  {
    id: 2,
    name: "Double Cheeseburger",
    description:
      "Perpaduan roti burger dengan 2 Lapisan daging gurih dan 2 lapisan keju disajikan dengan saus tomat, acar, potongan bawang dan mustard",
    price: 38000,
    imgUrl:
      "https://nos.jkt-1.neo.id/mcdonalds/foods/October2019/apZ1DxDmKvwS2lV12Elp.png",
    authorId: 1,
    categoryId: 1,
    category: "BURGERS",
    stock: 999,
  },
  {
    id: 3,
    name: "McFlurry Choco",
    description: "Es krim vanilla lembut dengan campuran bubuk coklat",
    price: 10000,
    imgUrl:
      "https://nos.jkt-1.neo.id/mcdonalds/foods/October2022/bcp2nCLBZXHCLkf81S2q.png",
    authorId: 1,
    categoryId: 3,
    category: "ICECREAM",
    stock: 999,
  },
  {
    id: 4,
    name: "McNuggets",
    description:
      "Nugget ayam McDonald's dan saus Sweet & Sour atau Barbeque pilihan Anda. Tersedia dalam pilihan 4, 6 dan 9 pieces",
    price: 20000,
    imgUrl:
      "https://nos.jkt-1.neo.id/mcdonalds/foods/September2019/qFoLKbSe1R3OJ75zAm4B.png",
    authorId: 1,
    categoryId: 2,
    category: "CHICKEN",
    stock: 999,
  },
  {
    id: 5,
    name: "Big Mac",
    description:
      "Burger Ikonik McDonald's. Dua lapis daging sapi gurih disajikan dengan saus spesial, selada segar, keju, acar timun, bawang, diapit roti bertabur wijen",
    price: 40000,
    imgUrl:
      "https://nos.jkt-1.neo.id/mcdonalds/foods/October2019/nhj93oZApoMavF1lC6Wm.png",
    authorId: 1,
    categoryId: 1,
    stock: 999,
  },
  {
    id: 6,
    name: "Double Cheeseburger",
    description:
      "Perpaduan roti burger dengan 2 Lapisan daging gurih dan 2 lapisan keju disajikan dengan saus tomat, acar, potongan bawang dan mustard",
    price: 38000,
    imgUrl:
      "https://nos.jkt-1.neo.id/mcdonalds/foods/October2019/apZ1DxDmKvwS2lV12Elp.png",
    authorId: 1,
    categoryId: 1,
    stock: 999,
  },
  {
    id: 7,
    name: "McFlurry Choco",
    description: "Es krim vanilla lembut dengan campuran bubuk coklat",
    price: 10000,
    imgUrl:
      "https://nos.jkt-1.neo.id/mcdonalds/foods/October2022/bcp2nCLBZXHCLkf81S2q.png",
    authorId: 1,
    categoryId: 3,
    stock: 999,
  },
  {
    id: 8,
    name: "McNuggets",
    description:
      "Nugget ayam McDonald's dan saus Sweet & Sour atau Barbeque pilihan Anda. Tersedia dalam pilihan 4, 6 dan 9 pieces",
    price: 20000,
    imgUrl:
      "https://nos.jkt-1.neo.id/mcdonalds/foods/September2019/qFoLKbSe1R3OJ75zAm4B.png",
    authorId: 1,
    categoryId: 2,
    stock: 999,
  },
  {
    id: 9,
    name: "Big Mac",
    description:
      "Burger Ikonik McDonald's. Dua lapis daging sapi gurih disajikan dengan saus spesial, selada segar, keju, acar timun, bawang, diapit roti bertabur wijen",
    price: 40000,
    imgUrl:
      "https://nos.jkt-1.neo.id/mcdonalds/foods/October2019/nhj93oZApoMavF1lC6Wm.png",
    authorId: 1,
    categoryId: 1,
    stock: 999,
  },
  {
    id: 10,
    name: "Double Cheeseburger",
    description:
      "Perpaduan roti burger dengan 2 Lapisan daging gurih dan 2 lapisan keju disajikan dengan saus tomat, acar, potongan bawang dan mustard",
    price: 38000,
    imgUrl:
      "https://nos.jkt-1.neo.id/mcdonalds/foods/October2019/apZ1DxDmKvwS2lV12Elp.png",
    authorId: 1,
    categoryId: 1,
    stock: 999,
  },
  {
    id: 11,
    name: "McFlurry Choco",
    description: "Es krim vanilla lembut dengan campuran bubuk coklat",
    price: 10000,
    imgUrl:
      "https://nos.jkt-1.neo.id/mcdonalds/foods/October2022/bcp2nCLBZXHCLkf81S2q.png",
    authorId: 1,
    categoryId: 3,
    stock: 999,
  },
  {
    id: 12,
    name: "McNuggets",
    description:
      "Nugget ayam McDonald's dan saus Sweet & Sour atau Barbeque pilihan Anda. Tersedia dalam pilihan 4, 6 dan 9 pieces",
    price: 20000,
    imgUrl:
      "https://nos.jkt-1.neo.id/mcdonalds/foods/September2019/qFoLKbSe1R3OJ75zAm4B.png",
    authorId: 1,
    categoryId: 2,
    stock: 999,
  },
];

const category = [
  {
    id: 1,
    name: "BURGERS",
  },
  {
    id: 2,
    name: "CHICKEN",
  },
  {
    id: 3,
    name: "FISH",
  },
  {
    id: 4,
    name: "BEVERAGES",
  },
  {
    id: 5,
    name: "ICECREAM",
  },
  {
    id: 6,
    name: "COFFEE",
  },
  {
    id: 7,
    name: "DESSERT",
  },
];

export function Makanan({ navigation }) {
  const { data, loading, error } = useQuery(GET_MENUS);

  console.log(data, "ini Data");

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (error) {
    console.log(error, "ini error");
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  const RenderCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.imgUrl }}
          style={{
            width: "100%",
            height: "100%",
            maxHeight: 120,
            resizeMode: "contain",
            borderRadius: 10,
          }}
        />
        <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 16 }}>
          {item.name}
        </Text>
      </View>
    );
  };

  const RenderCategory = ({ item }) => {
    return (
      <View style={styles.carousel}>
        <Text
          style={{
            fontSize: 12,
            paddingHorizontal: 15,
            color: "white",
            fontWeight: "bold",
          }}
        >
          {item.name}
        </Text>
      </View>
    );
  };

  const pressHandler = (id) => {
    console.log(id, "dpt id");
    navigation.navigate("DetailMenu", { menuId: id });
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={category}
        renderItem={({ item }) => (
          <TouchableOpacity
            // onPress={() => pressHandler(item.id)}
            style={{ flex: 1 }}
          >
            <RenderCategory item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={(styles.cardContainer, { padding: 20 })}
      />
      <FlatList
        data={data?.items}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => pressHandler(item.id)}
            style={{ flex: 1 }}
          >
            <RenderCard item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.cardContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  card: {
    margin: 10,
    height: 200,
    width: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // shadowColor: "#000000",
    // shadowOffset: {
    //   width: 0,
    //   height: 6,
    // },
    // shadowOpacity: 0.9,
    // shadowRadius: 20,
    // elevation: 8,
  },
  carousel: {
    display: "flex",
    height: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderColor: "grey",
    borderRadius: 20,
    backgroundColor: "red",
  },
});
