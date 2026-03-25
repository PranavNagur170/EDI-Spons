import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "./screens/Dashboard";
import Monitoring from "./screens/Monitoring";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Monitoring" component={Monitoring} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}