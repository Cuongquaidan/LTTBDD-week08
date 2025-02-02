import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import NoteItem from "./components/NoteItem";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "./context/authContext";
import useGetFetch from "./hooks/useGetFetch";

const Edit = ({ navigation, route }) => {
    const { user, setUser } = useAuth();
    const [notes, setNotes] = useState([]);

    // Fetch data using the useGetFetch hook
    const { data, error } = useGetFetch(
        `https://66f5f8bb436827ced97590b0.mockapi.io/api/v1/notes/${user}`
    );

    // Cập nhật trạng thái notes khi dữ liệu từ API hoặc route thay đổi
    useEffect(() => {
        if (route.params?.notes) {
            setNotes(route.params.notes);
        } else if (data?.notes) {
            setNotes(data.notes);
        }
    }, [route.params?.notes, data?.notes]);
    const handleRemove = async (selectedID) => {
        const updatedNotes = notes.filter((item) => item.id !== selectedID);
        try {
            const response = await fetch(
                `https://66f5f8bb436827ced97590b0.mockapi.io/api/v1/notes/${user}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ notes: updatedNotes }),
                }
            );
            if (!response.ok) throw new Error("Delete failed");

            console.log(updatedNotes);
            setNotes(updatedNotes);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <SafeAreaView>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 20,
                }}
            >
                <Pressable
                    onPress={() => {
                        navigation.navigate("Home");
                        setUser("");
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
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                    <View>
                        <Text style={{ fontWeight: "700", fontSize: 16 }}>
                            Hi {data?.name}
                        </Text>
                        <Text style={{ color: "#gray", fontSize: 12 }}>
                            Have a great day ahead
                        </Text>
                    </View>
                </View>
            </View>

            <ScrollView>
                <View>
                    {notes.map((item, index) => (
                        <NoteItem
                            note={item}
                            key={index}
                            handleRemove={() => handleRemove(item.id)}
                            handleEdit={() => {
                                navigation.navigate("Add", {
                                    notes: data.notes,
                                    note: item,
                                });
                            }}
                        />
                    ))}
                    {!data && <Text>Không có dữ liệu</Text>}
                </View>
            </ScrollView>

            <Pressable
                style={{ marginTop: 60, marginHorizontal: "auto" }}
                onPress={() => navigation.navigate("Add", { notes })}
            >
                <Ionicons name="add-circle-sharp" size={80} color="#00BDD6" />
            </Pressable>
        </SafeAreaView>
    );
};

export default Edit;
