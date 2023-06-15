import { StyleSheet, View, Text } from "react-native";

export function Restoran() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#F9f1da",
    },
  });

  return (
    <View style={styles.container}>
      <Text>Restoran</Text>
    </View>
  );
}
