import {TouchableOpacity, TouchableOpacityProps, Text, TextProps} from "react-native"

import { s } from "./styles"
import { colors } from "@/styles/theme"

function Button({children}: TouchableOpacityProps){
    return <TouchableOpacity activeOpacity={0.8}>{children}</TouchableOpacity>
}

function Title({children}: TextProps) {
    return <Text>{children}</Text>
}

Button.Title = Title

export {Button}