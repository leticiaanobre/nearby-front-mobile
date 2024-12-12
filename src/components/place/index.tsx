import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import {s} from "./styles"
import {colors} from "@/styles/theme"
import { IconTicket } from "@tabler/icons-react-native";

export type PlaceProps = {
    id: string;
    name: string;
    description: string;
    cupons: number;
    cover: string;
    address: string;
}

type Props = TouchableOpacityProps & {
    data: PlaceProps;
}

export function Place({data, ...rest}: Props) {
    return(
        <TouchableOpacity style={s.container} {...rest}>
            <Image style={s.image} source={{uri: data.cover}}/>

            <View style={s.content}>
                <Text style={s.name}>{data.name}</Text>
                <Text style={s.description} numberOfLines={2}>{data.description}</Text>

                <View style={s.footer}>
                    <IconTicket size={16} color={colors.red.base} />
                    <Text style={s.tickets}>{data.cupons} cupons disponíveis</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}