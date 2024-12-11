import { api } from "@/services/api";
import { View, Text, Alert } from "react-native";
import { useEffect } from "react";

export default function Home() {
    async function fetchCategories() {
        try {
            const {data} = await api.get("/categories")
            console.log(data)
        } catch (error) {
            console.log(error)
            Alert.alert("Categorias", "Não foi possível carregar as categorias")
        }
    }
    useEffect(() => {
        fetchCategories()
    }, [])
    return (
        <View style={{flex: 1}}>
            <Text>Home</Text>
        </View>
    )
}