import { Text, Pressable, PressableProps } from "react-native";
import { categoriesIcons } from "@/utils/categories-icons";

import {s} from "./style"

type Props = PressableProps & {
    iconId: string
    isSelected?: boolean
    name: string
}

export function Category({name, iconId, isSelected = false, ...rest}: Props) {
    const Icon = categoriesIcons[iconId]
    return(
        <Pressable style={[s.container]}>
            <Icon size={16} />
            <Text style={[s.name]}>{name}</Text>
        </Pressable>
    )
}