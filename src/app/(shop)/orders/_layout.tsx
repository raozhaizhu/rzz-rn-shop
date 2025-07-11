import { useOrderUpdateSubscription } from "@/api/subscriptions";
import { Stack } from "expo-router";

export default function OrdersLayout() {
    useOrderUpdateSubscription();
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    );
}
