import { NotificationData } from "@/types/notification";
import Notification from "./Notification";

interface Props {
    notifications: NotificationData[];
}

export default function NotificationList({notifications}: Props) {

    return (
        <div className="flex flex-col gap-2">
            {notifications.map((act) => (
                <Notification prop={act} key={act.id} />
            ))}
        </div>
    )
}


