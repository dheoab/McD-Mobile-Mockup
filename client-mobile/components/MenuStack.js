import { createStackNavigator } from "@react-navigation/stack";
import { Makanan } from "../screens/Makanan";
import { DetailMenu } from "../screens/DetailMenu";

const Stack = createStackNavigator();

function MenuStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MakananScreen" component={Makanan} />
      <Stack.Screen name="DetailMenu" component={DetailMenu} />
    </Stack.Navigator>
  );
}

export default MenuStack;
