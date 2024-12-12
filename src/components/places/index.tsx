import { Text, useWindowDimensions } from "react-native";
import { Place, PlaceProps} from "../place";
import BottomSheet, {BottomSheetFlatList} from "@gorhom/bottom-sheet"
import { useRef } from "react";

type Props = {
    data: PlaceProps[]
}

export function Places({ data}: Props) {
    const dimensions = useWindowDimensions()
    const bottomSheetRef = useRef<BottomSheet>(null)
    return(
        <BottomSheet>
            <BottomSheetFlatList 
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <Place data={item} />}/>
        </BottomSheet>
    )
}