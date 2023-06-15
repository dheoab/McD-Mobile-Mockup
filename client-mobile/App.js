import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { MD3LightTheme as DefaultTheme, useTheme } from "react-native-paper";
import { Beranda } from "./screens/Beranda";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Restoran } from "./screens/Restoran";
import { Lainnya } from "./screens/Lainnya";
import { Penawaran } from "./screens/Penawaran";
import Ionicons from "react-native-vector-icons/Ionicons";
import MenuStack from "./components/MenuStack";
import { ApolloProvider } from "@apollo/client";
import client from "./configs";
import DheoScreen from "./screens/sandbox";

export default function App() {
  const Navbar = createBottomTabNavigator();

  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <NavigationContainer>
          <Navbar.Navigator
            screenOptions={({ route }) => ({
              // headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Beranda") {
                  iconName = focused ? "ios-home-sharp" : "ios-home-outline";
                } else if (route.name === "Penawaran") {
                  iconName = focused ? "cash-outline" : "cash-outline";
                } else if (route.name === "Makanan") {
                  iconName = focused
                    ? "fast-food-outline"
                    : "fast-food-outline";
                } else if (route.name === "Restoran") {
                  iconName = focused ? "location-outline" : "location-outline";
                } else if (route.name === "Lainnya") {
                  iconName = focused
                    ? "reorder-three-outline"
                    : "reorder-three-outline";
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "#F72a2a",
              tabBarInactiveTintColor: "grey",
            })}
          >
            <Navbar.Screen
              name="Beranda"
              component={Beranda}
              options={{ headerShown: false }}
            />
            <Navbar.Screen name="Penawaran" component={Penawaran} />
            <Navbar.Screen
              options={{ headerShown: false }}
              name="Makanan"
              component={MenuStack}
            />
            <Navbar.Screen name="Restoran" component={Restoran} />
            <Navbar.Screen name="Lainnya" component={Lainnya} />
            {/* <Navbar.Screen name="sandbox" component={DheoScreen} /> */}
          </Navbar.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}
