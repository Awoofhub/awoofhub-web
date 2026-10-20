import { useMemo } from 'react';
import { useBanks } from './useBanks';


export function useBankName() {
    const { data: banks = [], isLoading } = useBanks();

    const getBankName = useMemo(() => {
        const bankNameMap = banks.reduce<Record<string, string>>((acc, bank) => {
            acc[bank.code] = bank.name;
            return acc;
        }, {});
        
        return (code: string) => bankNameMap[code] || "Unknown Bank";
    }, [banks]);

    return {
        getBankName,
        banks,
        isLoading,
    };
}