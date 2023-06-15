import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const cardData = [
  {
    id: 1,
    name: "Segera Dapatkan Promonya",
    imgUrl:
      "https://nos.jkt-1.neo.id/mcdonalds/assets/img/home/ig/img_ig-5.jpg",
  },
  {
    id: 2,
    name: "Segera Dapatkan Promonya",
    imgUrl:
      "https://nos.jkt-1.neo.id/mcdonalds/assets/img/home/ig/img_ig-1.jpg",
  },
  {
    id: 3,
    name: "Segera Dapatkan Promonya",
    imgUrl:
      "https://nos.jkt-1.neo.id/mcdonalds/assets/img/home/ig/img_ig-2.jpg",
  },
  {
    id: 4,
    name: "Segera Dapatkan Promonya",
    imgUrl:
      "https://nos.jkt-1.neo.id/mcdonalds/assets/img/home/ig/img_ig-6.jpg",
  },
  {
    id: 5,
    name: "Segera Dapatkan Promonya",
    imgUrl:
      "https://nos.jkt-1.neo.id/mcdonalds/assets/img/home/ig/img_ig-4.jpg",
  },
];

export function Beranda() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    card: {
      margin: 8,
      height: 200,
      width: "45%",
      display: "flex",
      flexDirection: "column",
      //   justifyContent: "center",
      alignItems: "stretch",
      borderRadius: 5,
      borderColor: "#C57123",
      //   borderWidth: 1,
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.9,
      shadowRadius: 20,
      elevation: 8,
    },
    cardContainer: {
      display: "flex",
      flexDirection: "column",
      //   justifyContent: "center",
      alignItems: "flex-start",
      flex: 5,
    },
    backgroundContainer: {
      //   marginTop: 200,
      flex: 5,
      backgroundColor: "white",
    },
    topContainer: {
      flex: 2,
      height: 250,
      marginBottom: 50,
    },
  });

  const renderCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.imgUrl }}
          style={{
            width: "100%",
            height: "100%",
            maxHeight: 250,
            resizeMode: "cover",
            borderRadius: 5,
          }}
        />
        <Text
          style={{
            marginLeft: 5,
            marginTop: -50,
            fontWeight: "bold",
            fontSize: 16,
            color: "white",
            textShadowColor: "black",
            textShadowRadius: 10,
          }}
        >
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        <ScrollView>
          <View style={styles.topContainer}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1609427955204-d0a737cb2c1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2664&q=80",
              }}
              style={{
                width: "100%",
                height: "100%",
                maxHeight: 400,
                resizeMode: "cover",
                borderRadius: 5,
              }}
            />
            <Text
              style={{
                marginTop: -100,
                // marginLeft: 10,
                fontWeight: "bold",
                fontSize: 28,
                color: "yellow",
                textShadowColor: "grey",
                textAlign: "center",
                textShadowRadius: 5,
                fontFamily: "Roboto",
              }}
            >
              {/* Welcome to McDonalds */}
            </Text>
            <Text
              style={{
                marginTop: 75,
                marginLeft: 10,
                fontWeight: "bold",
                fontSize: 32,
                color: "black",
              }}
            >
              Hi!
            </Text>
          </View>
          <FlatList
            data={cardData}
            renderItem={renderCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={(styles.cardContainer, { padding: 5 })}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
