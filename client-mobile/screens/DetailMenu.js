import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Image } from "react-native-elements";
import { GET_MENUS, GET_MENU_BY_ID } from "../queries/query";
import { useQuery } from "@apollo/client";

// const menu = {
//   id: 2,
//   name: "Double Cheeseburger",
//   description:
//     "Perpaduan roti burger dengan 2 Lapisan daging gurih dan 2 lapisan keju disajikan dengan saus tomat, acar, potongan bawang dan mustard",
//   price: 38000,
//   imgUrl:
//     "https://nos.jkt-1.neo.id/mcdonalds/foods/October2019/apZ1DxDmKvwS2lV12Elp.png",
//   authorId: 1,
//   categoryId: 1,
//   category: "BURGERS",
//   stock: 999,
// };

// const menus = [
//   {
//     id: 1,
//     name: "Big Mac",
//     description:
//       "Burger Ikonik McDonald's. Dua lapis daging sapi gurih disajikan dengan saus spesial, selada segar, keju, acar timun, bawang, diapit roti bertabur wijen",
//     price: 40000,
//     imgUrl:
//       "https://nos.jkt-1.neo.id/mcdonalds/foods/October2019/nhj93oZApoMavF1lC6Wm.png",
//     authorId: 1,
//     categoryId: 1,
//     category: "BURGERS",
//     stock: 999,
//   },
//   {
//     id: 2,
//     name: "Double Cheeseburger",
//     description:
//       "Perpaduan roti burger dengan 2 Lapisan daging gurih dan 2 lapisan keju disajikan dengan saus tomat, acar, potongan bawang dan mustard",
//     price: 38000,
//     imgUrl:
//       "https://nos.jkt-1.neo.id/mcdonalds/foods/October2019/apZ1DxDmKvwS2lV12Elp.png",
//     authorId: 1,
//     categoryId: 1,
//     category: "BURGERS",
//     stock: 999,
//   },
//   {
//     id: 3,
//     name: "McFlurry Choco",
//     description: "Es krim vanilla lembut dengan campuran bubuk coklat",
//     price: 10000,
//     imgUrl:
//       "https://nos.jkt-1.neo.id/mcdonalds/foods/October2022/bcp2nCLBZXHCLkf81S2q.png",
//     authorId: 1,
//     categoryId: 3,
//     category: "ICECREAM",
//     stock: 999,
//   },
//   {
//     id: 4,
//     name: "McNuggets",
//     description:
//       "Nugget ayam McDonald's dan saus Sweet & Sour atau Barbeque pilihan Anda. Tersedia dalam pilihan 4, 6 dan 9 pieces",
//     price: 20000,
//     imgUrl:
//       "https://nos.jkt-1.neo.id/mcdonalds/foods/September2019/qFoLKbSe1R3OJ75zAm4B.png",
//     authorId: 1,
//     categoryId: 2,
//     category: "CHICKEN",
//     stock: 999,
//   },
//   {
//     id: 5,
//     name: "Big Mac",
//     description:
//       "Burger Ikonik McDonald's. Dua lapis daging sapi gurih disajikan dengan saus spesial, selada segar, keju, acar timun, bawang, diapit roti bertabur wijen",
//     price: 40000,
//     imgUrl:
//       "https://nos.jkt-1.neo.id/mcdonalds/foods/October2019/nhj93oZApoMavF1lC6Wm.png",
//     authorId: 1,
//     categoryId: 1,
//     stock: 999,
//   },
//   {
//     id: 6,
//     name: "Double Cheeseburger",
//     description:
//       "Perpaduan roti burger dengan 2 Lapisan daging gurih dan 2 lapisan keju disajikan dengan saus tomat, acar, potongan bawang dan mustard",
//     price: 38000,
//     imgUrl:
//       "https://nos.jkt-1.neo.id/mcdonalds/foods/October2019/apZ1DxDmKvwS2lV12Elp.png",
//     authorId: 1,
//     categoryId: 1,
//     stock: 999,
//   },
//   {
//     id: 7,
//     name: "McFlurry Choco",
//     description: "Es krim vanilla lembut dengan campuran bubuk coklat",
//     price: 10000,
//     imgUrl:
//       "https://nos.jkt-1.neo.id/mcdonalds/foods/October2022/bcp2nCLBZXHCLkf81S2q.png",
//     authorId: 1,
//     categoryId: 3,
//     stock: 999,
//   },
//   {
//     id: 8,
//     name: "McNuggets",
//     description:
//       "Nugget ayam McDonald's dan saus Sweet & Sour atau Barbeque pilihan Anda. Tersedia dalam pilihan 4, 6 dan 9 pieces",
//     price: 20000,
//     imgUrl:
//       "https://nos.jkt-1.neo.id/mcdonalds/foods/September2019/qFoLKbSe1R3OJ75zAm4B.png",
//     authorId: 1,
//     categoryId: 2,
//     stock: 999,
//   },
// ];

export function DetailMenu({ route, navigation }) {
  const { menuId } = route.params;

  const { data } = useQuery(GET_MENU_BY_ID, {
    variables: { itemId: menuId },
  });

  const { data: menus } = useQuery(GET_MENUS);

  console.log(data, "ini data");

  console.log(menus, "menus");

  console.log(menuId, "ini menuID");

  console.log(data?.item, "ini data item satuan");

  const RenderCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.imgUrl }}
          style={{
            width: 100,
            height: 100,
            maxHeight: 120,
            resizeMode: "contain",
            borderRadius: 10,
          }}
        />
        <Text
          style={{
            marginTop: 10,
            fontWeight: "bold",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Image
            source={{
              uri: data?.item.imgUrl,
            }}
            style={{
              width: 300,
              height: 300,
              maxHeight: 400,
              resizeMode: "contain",
              borderRadius: 10,
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>{data?.item?.name}</Text>
          <Text
            style={[
              styles.textDescription,
              { fontFamily: "sans-serif-condensed" },
            ]}
          >
            {data?.item?.description}
          </Text>
          <TouchableOpacity style={styles.button}>
            <View
              style={{ alignItems: "flex-start", justifyContent: "flex-start" }}
            >
              <Text style={styles.buttonText}>Pesan Sekarang</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.carousel}>
          <View style={styles.carouselText}>
            <Text
              style={{ fontSize: 24, fontWeight: "900", letterSpacing: -1 }}
            >
              Menu Rekomendasi Lainnya
            </Text>
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={menus.items}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ flex: 1 }}>
                <RenderCard item={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.cardContainer}
          ></FlatList>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
    fontFamily: "monospace",
  },
  textTitle: {
    letterSpacing: -1,
    fontSize: 24,
    marginTop: -20,
    fontWeight: "900",
    textAlign: "left",
    marginLeft: 10,
  },
  subContainer: {
    alignItems: "center",
    backgroundColor: "#F9f1da",
  },
  textDescription: {
    fontSize: 16,
    // fontWeight: "bold",
    textAlign: "left",
    marginLeft: 10,
    marginTop: 10,
    color: "grey",
    lineHeight: 23,
  },
  textContainer: {
    padding: 5,
    paddingBottom: 25,
    backgroundColor: "#F9f1da",
    flex: 3,
  },
  carousel: {
    marginTop: 20,
    flex: 1,
  },
  button: {
    marginTop: 30,
    marginLeft: 10,
    width: 150,
    height: 35,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "900",
  },
  carouselText: {
    alignItems: "center",
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
    margin: -15,
  },
});
