"use client";

import { useBanks } from "@/features/creator-studio/useBanks";
import { Bank } from "@/types/creator-studio";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";


interface BankSearchProps {
    label?: string;
    error?: any;
    compulsory?: boolean;
    onBankSelect: (bankCode: string) => void;
    value?: string;
    placeholder?: string;
    labelClassName?: string;
}

export const BankSearch = ({
    label,
    error,
    compulsory,
    onBankSelect,
    value,
    placeholder,
    labelClassName
}: BankSearchProps) => {
    const { data: banks = [], isLoading: isBanksLoading } = useBanks();
    const [inputValue, setInputValue] = useState("");

    const uniqueBanks = useMemo(() => {
        const seen = new Set();
        return banks.filter((bank: Bank) => {
            if (seen.has(bank.code)) return false;
            seen.add(bank.code);
            return true;
        });
    }, [banks]);

    const selectedBank = useMemo(() => {
        return uniqueBanks.find((b: Bank) => b.code === value);
    }, [uniqueBanks, value]);

    useEffect(() => {
        if (selectedBank) {
            setInputValue(selectedBank.name);
        } else if (!value) {
            setInputValue("");
        }
    }, [value, selectedBank]);

    return (
        <FormControl isInvalid={!!error} className="w-full mb-4">
            {label && (
                <FormLabel className={labelClassName ?? "font-baloo text-sm lg:text-lg"}>
                    {label} {compulsory && <span className="text-red-500">*</span>}
                </FormLabel>
            )}

            <div className="relative flex items-center">
                <span className="absolute left-3 top-4.5 z-10 text-gray-500 flex items-center">
                    <IoSearch size={18} className="text-gray-400" />
                </span>

                <Autocomplete
                    className="w-full"
                    options={uniqueBanks}
                    loading={isBanksLoading}
                    value={uniqueBanks.find((b: Bank) => b.code === value) || null}
                    inputValue={inputValue}
                    getOptionKey={(option) =>
                        typeof option === "string" ? option : `${option.code}-${option.name}`
                    }
                    onInputChange={(_, val) => setInputValue(val)}
                    getOptionLabel={(option) => (typeof option === "string" ? option : option.name)}
                    filterOptions={(options, { inputValue }) => {
                        return options.filter((bank: Bank) =>
                            bank.name.toLowerCase().includes(inputValue.toLowerCase())
                        );
                    }}
                    onChange={(_, newValue) => {
                        if (!newValue || typeof newValue === "string") {
                            onBankSelect("");
                            return;
                        }
                        onBankSelect(newValue.code);
                    }}
                    slotProps={{
                        paper: {
                            className: "!font-baloo !text-lg",
                        },
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            placeholder={placeholder ?? "Select or search bank..."}
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    disableUnderline: true,
                                    className: `!mt-2 !w-full !pl-9 !pr-3 !py-2 !bg-white !border ${error ? '!border-red-500' : '!border-gray-300'
                                        } !rounded-md !shadow-sm !text-sm !lg:text-lg focus-within:!border-orange-500
                                    [&_.MuiAutocomplete-endAdornment]:!px-3`,
                                },
                                htmlInput: {
                                    ...params.inputProps,
                                    className: "!font-montserrat !text-sm !lg:text-lg !placeholder-gray-800 !py-0",
                                },
                            }}
                            className="[&_svg]:!fill-gray-500"
                        />
                    )}
                />
            </div>

            {error && (
                <FormHelperText className="text-red-500 text-left text-xs mt-1">
                    {error.message}
                </FormHelperText>
            )}
        </FormControl>
    );
};