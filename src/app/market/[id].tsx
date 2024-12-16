import { useEffect, useState, useRef } from "react";
import { View, Modal, Alert, StatusBar, ScrollView } from "react-native";
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
    const [cuponIsFetching, setCuponIsFetching] = useState(false)

    const [_, requestPermission] = useCameraPermissions()
    const params = useLocalSearchParams<{id: string}>()

    const qrLock = useRef(false)
    console.log(params.id)

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

            qrLock.current = false //libera a camera
            setIsVisibleCameraModal(true)
        } catch (error) {
            console.log(error)
            Alert.alert("Câmera", "Não foi possível utilizar a câmera")
        }
    }

    async function getCoupon(id: string) {
        try {
            setCuponIsFetching(true)

            const {data} = await api.patch("/coupons/" + id)

            Alert.alert("Cupom", data.coupon)
            setCupon(data.coupon)
        } catch (error) {
            console.log(error)
            Alert.alert("Erro", "Não foi possível utilizar o cupom")
        } finally {
            setCuponIsFetching(false)
        }
    }

    function handleUseCupon(id: string) {
        setIsVisibleCameraModal(false)

        Alert.alert(
            "Cupom", 
            "Não é possível utilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
            [
                {style: "cancel", text: "Não"},
                {text: "Sim", onPress: () => getCoupon(id)}
            ]
        )
    }

    useEffect(() => {
        fetchMarket()
    }, [params.id, cupon])

    if(isLoading) {
        return <Loading/>
    }

    if(!data) {
        return <Redirect href="/home"/>
    }

    return (
        <View style={{flex: 1}}>
            <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />
            <ScrollView showsVerticalScrollIndicator={false} >
                <Cover uri={data.cover}/>
                <Details data={data}/>
            </ScrollView>
            { cupon && <Cupon code={cupon} />}
            <View style ={{padding: 32}}>
                <Button onPress={handleOpeCamera}>
                    <Button.Title>Ler QR Code</Button.Title>
                </Button>
            </View>

            <Modal style={{flex:1}} visible={isVisibleCameraModal}>
                <CameraView 
                    style={{flex: 1}}
                    facing="back"
                    onBarcodeScanned={({data}) => {
                        if(data && !qrLock.current) {
                            qrLock.current = true
                            setTimeout(() => handleUseCupon (data), 500)
                        }
                    }}
                    />

                <View style={{position: "absolute", bottom: 32, left: 32, right: 32}}>
                    <Button 
                        onPress={() => setIsVisibleCameraModal(false)}
                        isLoading={cuponIsFetching}
                        >
                        <Button.Title>Voltar</Button.Title>
                    </Button>
                </View>
            </Modal>
        </View>
    )
}