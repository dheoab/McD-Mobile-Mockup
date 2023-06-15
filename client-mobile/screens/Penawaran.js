import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

export function Penawaran() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#F9f1da",
    },
  });

  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  return (
    <View style={styles.container}>
      <Text>Penawaran</Text>
    </View>
  );
}
