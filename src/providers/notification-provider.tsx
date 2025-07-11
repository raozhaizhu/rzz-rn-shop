import { PropsWithChildren, useEffect, useState } from "react";
import { registerForPushNotificationsAsync } from "@/lib/notification";
import * as Notifications from "expo-notifications";
import { supabase } from "@/lib/supabase";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
        shouldShowAlert: true,
    }),
});

export const NotificationProvider = ({ children }: PropsWithChildren) => {
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);

    const saveUserPushNotificationToken = async (token: string) => {
        if (!token.length) return;

        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (!session) return;

        const { error } = await supabase
            .from("users")
            .update({
                expo_notification_token: token,
            })
            .eq("id", session.user.id);

        if (error) console.error(`Creating expo_notification_token failed for ${session.user}`, error.message);
    };

    useEffect(() => {
        registerForPushNotificationsAsync()
            .then((token) => {
                setExpoPushToken(token ?? "");
                saveUserPushNotificationToken(token ?? "");
            })
            .catch((error: any) => setExpoPushToken(`${error}`));

        const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
        });

        const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
        });

        return () => {
            notificationListener.remove();
            responseListener.remove();
        };
    }, []);

    // console.log("expoPushToken", expoPushToken);
    // console.log("notification", notification);

    return <>{children}</>;
};

export default NotificationProvider;
