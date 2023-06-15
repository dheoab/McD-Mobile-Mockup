import { StyleSheet, View, Text } from "react-native";

export function Lainnya() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F9f1da",
    },
  });

  return (
    <View style={styles.container}>
      <Text>Lainnya</Text>
    </View>
  );
}
