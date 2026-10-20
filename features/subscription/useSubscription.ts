import SubscriptionService from '@/services/subscription.service';
import { Subscription } from '@/types/subscription';
import { useQuery } from '@tanstack/react-query';


export const GetSubscription = async (): Promise<Subscription> => {
    const result = await SubscriptionService.get();
    return result.data; 
}; 

export const useSubscription = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['subscription'],
        queryFn: () => GetSubscription(),
    });
    
    return { data, isLoading };
};