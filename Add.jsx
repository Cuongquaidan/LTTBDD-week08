import {
    View,
    Text,
    SafeAreaView,
    Pressable,
    Image,
    ScrollView,
    TextInput,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "./context/authContext";
const Add = ({ navigation, route }) => {
    const { user, setUser } = useAuth();
    const note = route.params.note;
    const [noteContent, setNoteContent] = useState(note?.content || "");
    let notes = route.params.notes;
    const handleSubmit = async () => {
        if (!noteContent) {
            alert("Please enter a note");
            return;
        }

        try {
            const updatedNotes = note
                ? notes.map((item) =>
                      item.id === note.id
                          ? { ...item, content: noteContent }
                          : item
                  )
                : [
                      ...notes,
                      { id: `N${notes.length + 1}`, content: noteContent },
                  ];

            const response = await fetch(
                `https://66f5f8bb436827ced97590b0.mockapi.io/api/v1/notes/${user}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: user,
                        id: user,
                        notes: updatedNotes,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update or add note");
            }
            console.log({ name: user, id: user, notes: updatedNotes });
            navigation.navigate("Edit", { notes: updatedNotes });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    padding: 20,
                }}
            >
                <Pressable
                    onPress={() => {
                        navigation.navigate("Edit");
                    }}
                >
                    <MaterialIcons
                        name="keyboard-backspace"
                        size={24}
                        color="black"
                    />
                </Pressable>
                <View
                    style={{ display: "flex", flexDirection: "row", gap: 10 }}
                >
                    <Image
                        source={{
                            uri: "https://images.pexels.com/photos/28210177/pexels-photo-28210177/free-photo-of-phong-c-nh-thien-nhien-mua-he-thu-v-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                        }}
                        style={{ width: 40, height: 40, borderRadius: "50%" }}
                    />
                    <View>
                        <Text style={{ fontWeight: 700, fontSize: 16 }}>
                            Hi {user}
                        </Text>
                        <Text style={{ color: "gray", fontSize: 12 }}>
                            Have a great day ahead
                        </Text>
                    </View>
                </View>
            </View>
            <ScrollView style={{ alignItems: "center", gap: 20 }}>
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: 700,
                        textAlign: "center",
                    }}
                >
                    {note ? "UPDATE YOUR JOB" : "ADD YOUR JOB"}
                </Text>
                <TextInput
                    placeholder="Enter your note"
                    style={{
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingHorizontal: 40,
                        paddingVertical: 10,
                        borderColor: "#9095A0",
                        color: "#9095A0",
                        minWidth: 300,
                        width: "80%",
                        marginHorizontal: "auto",
                        marginTop: 10,
                    }}
                    value={noteContent}
                    onChangeText={(value) => setNoteContent(value)}
                />
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
                    onPress={handleSubmit}
                >
                    FINISH -{">"}
                </Pressable>
                <Image
                    source={require("./assets/images/note.png")}
                    style={{
                        width: 100,
                        height: 100,
                        marginHorizontal: "auto",
                        marginTop: 40,
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Add;
