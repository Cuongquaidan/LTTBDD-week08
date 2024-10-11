import { View, Text, Pressable } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
const NoteItem = ({ note, handleEdit, handleRemove, ...props }) => {
    return (
        <View
            {...props}
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                minWidth: 300,
                marginHorizontal: "auto",
                width: "50%",
                backgroundColor: "#ddd",
                marginTop: 20,
                borderRadius: 10,
                padding: 10,
            }}
        >
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                <AntDesign name="checksquareo" size={24} color="green" />
                <Text numberOfLines={1} style={{ fontWeight: 700 }}>
                    {note.content}
                </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                <Pressable onPress={handleRemove}>
                    <AntDesign name="delete" size={24} color="red" />
                </Pressable>
                <Pressable onPress={handleEdit}>
                    <AntDesign name="edit" size={24} color="yellow" />
                </Pressable>
            </View>
        </View>
    );
};

export default NoteItem;
