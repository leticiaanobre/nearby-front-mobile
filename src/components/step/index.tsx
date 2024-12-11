import { Text, View } from "react-native";

import { colors } from "@/styles/theme";
import { s } from "./styles";

export function Step(){
    return(
        <View style={s.container}>
            <Text>Titulo</Text>
            <Text>Descrição</Text>
        </View>
    )
}