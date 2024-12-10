import { Stack } from "expo-router"
import { colors } from "@/styles/colors"

export default function Layout() {
    return <Stack screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.gray[100] }
    }} />
}