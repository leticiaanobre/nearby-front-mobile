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