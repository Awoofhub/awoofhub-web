"use client";

import { NEXT_PUBLIC_TOMTOM_API_KEY } from "@/config/constants";
import { FormControl, FormLabel } from "@chakra-ui/react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";



export const TomTomAutocomplete = ({ label, error, compulsory, onPlaceSelect, value, placeholder }: any) => {
    const [options, setOptionsList] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        setInputValue(value ?? "");
    }, [value]);

    const fetchSuggestions = useMemo(
        () =>
            debounce(async (query: string) => {
                if (!query) {
                    setOptionsList([]);
                    return;
                }

                try {
                    const { data } = await axios.get(
                        `https://api.tomtom.com/search/2/search/${encodeURIComponent(
                            query
                        )}.json`,
                        {
                            params: {
                                key: NEXT_PUBLIC_TOMTOM_API_KEY,
                                limit: 5,
                                typeahead: true,
                            },
                        }
                    );

                    setOptionsList(data.results);
                } catch (err) {
                    console.log(err)
                }
            }, 400),
        []
    );

    useEffect(() => {
        fetchSuggestions(inputValue);
    }, [inputValue, fetchSuggestions]);

    useEffect(() => {
        return () => fetchSuggestions.cancel();
    }, [fetchSuggestions]);

    return (
        <FormControl isInvalid={!!error} className="w-full mb-4">
            {label && (
                <FormLabel className="font-baloo  text-sm lg:text-lg">
                    {label} {compulsory && <span className="text-red-500">*</span>}
                </FormLabel>
            )}

            <Autocomplete
                freeSolo
                options={options}
                value={value || null}
                inputValue={inputValue}
                getOptionKey={(option) =>
                    typeof option === "string"
                        ? option
                        : option.id
                }
                onInputChange={(e, val) => setInputValue(val)}
                getOptionLabel={(option) => {
                    if (typeof option === "string") return option;
                    return option?.address?.freeformAddress ?? "";
                }}
                filterOptions={(x) => x}
                autoComplete
                includeInputInList
                onBlur={() => {
                    onPlaceSelect(inputValue);
                }}
                onChange={(_, newValue) => {
                    if (!newValue) {
                        onPlaceSelect("");
                        return;
                    }

                    if (typeof newValue === "string") {
                        onPlaceSelect(newValue);
                        return;
                    }

                    onPlaceSelect(newValue.address.freeformAddress);
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
                        placeholder={placeholder ?? "Search address..."}
                        slotProps={{
                            input: {
                                ...params.InputProps,
                                disableUnderline: true,
                                className: `!mt-2 !w-full !px-3 !py-3 !bg-white !border ${error ? '!border-red-500' : '!border-gray-300'} !rounded-md !shadow-sm !text-base !lg:text-lg focus-within:!border-orange-500
                                [&_.MuiAutocomplete-endAdornment]:!px-3`,
                            },
                            htmlInput: {
                                ...params.inputProps,
                                className: "!font-montserrat !text-base !lg:text-lg !placeholder-gray-400 !pr-8 !py-0",
                            },
                        }}
                        className="[&_svg]:!fill-gray-500"
                    />
                )}
            />
        </FormControl>
    );
};