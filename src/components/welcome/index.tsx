import {Image, Text, View} from "react-native"

import {s} from "./style"

export function Welcome(){
    return(
        <View>
            <Image source={require("@/assets/logo.png")} style={s.logo}/>
        </View>
    )
}