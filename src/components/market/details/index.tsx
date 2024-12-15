import {View, Text} from "react-native"
import {IconPhone, IconMapPin, IconTicket} from "@tabler/icons-react-native"

import {s} from "./style"

export type PropsDetails = {
    name: string
    description: string
    addess: string
    phone: string
    cupons: number
    rules: {
        id: string
        description: string
    }[]
}

type Props = {
    data: PropsDetails
}

export function Details({data}: Props) {
    return (
        <View style={s.container}>
            <Text style={s.name}>{data.name}</Text>
            <Text style={s.description}>{data.description}</Text>

            <View style={s.group}>
                <Text style={s.title}>Informações</Text>
            </View>
        </View>
    )
}