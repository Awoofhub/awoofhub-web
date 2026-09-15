import CategoryService from '@/services/category-service';
import { Category } from '@/types/category';
import { useQuery } from '@tanstack/react-query';


export const getBusinessCategory = async (): Promise<Category[]> => {
    const result = await CategoryService.getAllBusinessCategory();
    return result.data;
};

export const useBusinessCategory = () => {
    const { data, isLoading,isError } = useQuery({
        queryKey: ["business", 'category'],
        queryFn: () => getBusinessCategory(),
        initialData: []
    });

    return {
        data,
        isLoading,
        isError
    };
};

