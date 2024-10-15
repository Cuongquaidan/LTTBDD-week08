import { View, Text, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/authContext";
import Home from "./Home";
import Edit from "./Edit";
import Add from "./Add";
const Stack = createNativeStackNavigator();
const App = () => {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ headerShown: false }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="Edit"
                        component={Edit}
                        options={{ headerShown: false }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="Add"
                        component={Add}
                        options={{ headerShown: false }}
                    ></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
};

export default App;
