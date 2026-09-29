import AlertService from "@/services/alert-service";
import { Alert } from "@/types/alert";
import { useQuery } from "@tanstack/react-query";

type setAlertOptions = {
    id: string;
};

export const GetUserAlert = async ({ id }: setAlertOptions): Promise<Alert | null> => {
    const result = await AlertService.getUserAlert(id);
    return result.data
};

export const useUserAlert = (id: string) => {
    const { data, isLoading } = useQuery({
        queryKey: ['alert', id],
        queryFn: () => GetUserAlert({ id }),
    });


    const isSubscribed = !!data;

    return isSubscribed
};

