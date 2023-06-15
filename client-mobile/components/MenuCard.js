export const renderCard = ({ item }) => {
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
