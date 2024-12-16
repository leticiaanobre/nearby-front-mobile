import { useEffect, useState } from "react";
import { View, Modal, Alert } from "react-native";
import {router, useLocalSearchParams, Redirect} from "expo-router"
import { api } from "@/services/api";
import { useCameraPermissions, CameraView } from "expo-camera";

import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";
import { Cupon } from "@/components/market/cupon";
import { Button } from "@/components/button";

type DataProps = PropsDetails & {
    cover: string
}

export default function Market() {

    const [data, setData] = useState<DataProps>()
    const [isLoading, setIsLoading] = useState(true)
    const [cupon, setCupon] = useState<string | null>(null)
    const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)

    const [_, requestPermission] = useCameraPermissions()
    const params = useLocalSearchParams<{id: string}>()

    async function fetchMarket() {
        try {
            const {data} = await api.get(`/markets/${params.id}`)
            setData(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            Alert.alert("Erro", "Não foi possível carregar os dados",[
                {
                    text: "OK", 
                    onPress: () => router.back()
                }
            ])
        }
    }

   async function handleOpeCamera() {
        try {
            const {granted} = await requestPermission()

            if(!granted) {
                return Alert.alert("Câmera", "Você precisa habilitar o uso da câmera")
            }
            setIsVisibleCameraModal(true)
        } catch (error) {
            console.log(error)
            Alert.alert("Câmera", "Não foi possível utilizar a câmera")
        }
    }

    useEffect(() => {
        fetchMarket()
    }, [params.id])

    if(isLoading) {
        return <Loading/>
    }

    if(!data) {
        return <Redirect href="/home"/>
    }

    return (
        <View style={{flex: 1}}>
            <Cover uri={data.cover}/>
            <Details data={data}/>
            { cupon && <Cupon code={cupon} />}
            <View style ={{padding: 32}}>
                <Button onPress={handleOpeCamera}>
                    <Button.Title>Ler QR Code</Button.Title>
                </Button>
            </View>

            <Modal style={{flex:1}} visible={isVisibleCameraModal}>
                <CameraView style={{flex: 1}}/>

                <View style={{flex: 1, justifyContent: "center"}}>
                    <Button onPress={() => setIsVisibleCameraModal(false)}>
                        <Button.Title>Voltar</Button.Title>
                    </Button>
                </View>
            </Modal>
        </View>
    )
}