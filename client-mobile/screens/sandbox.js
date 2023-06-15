import { useQuery } from "@apollo/client";
import { View, Text } from "react-native";
import { GET_MENUS } from "../queries/query";

export default function DheoScreen() {
  const { data, loading, error } = useQuery(GET_MENUS);

  console.log(error, "ini error");
  return (
    <View>
      <Text>
        {loading
          ? "Loading"
          : error
          ? "Error"
          : data
          ? JSON.stringify(data)
          : "Kosong"}
      </Text>
    </View>
  );
}
