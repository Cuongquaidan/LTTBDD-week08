import {
    View,
    Text,
    TextInput,
    Pressable,
    Image,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
const Home = ({ navigation }) => {
    const [name, setName] = useState("");
    return (
        <ScrollView style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Image
                source={require("./assets/images/note.png")}
                style={{ width: 200, height: 200 }}
            />

            <Text
                style={{
                    fontSize: 20,
                    textAlign: "center",
                    color: "#8353E2",
                    fontWeight: 700,
                    marginTop: 10,
                }}
            >
                MANAGE {"\n"}YOUR TASK
            </Text>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 20,
                    position: "relative",
                    marginTop: 20,
                }}
            >
                <AntDesign
                    name="mail"
                    size={24}
                    color="#9095A0"
                    style={{ position: "absolute", left: 10 }}
                />
                <TextInput
                    placeholder="Enter your name"
                    style={{
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingHorizontal: 40,
                        paddingVertical: 10,
                        borderColor: "#9095A0",
                        color: "#9095A0",
                    }}
                    value={name}
                    onChangeText={(value) => setName(value)}
                ></TextInput>
            </View>
            <Pressable
                style={{
                    padding: 12,
                    marginTop: 100,
                    backgroundColor: "#00BDD6",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: 5,
                    width: "50%",
                    textAlign: "center",
                    fontSize: 10,
                    marginHorizontal: "auto",
                }}
                onPress={() => {
                    navigation.navigate("Edit", { name: name });
                }}
            >
                GET STARTED -{">"}
            </Pressable>
        </ScrollView>
    );
};

export default Home;
