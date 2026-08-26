import {
    FormControl,
    FormHelperText,
    FormLabel,
    forwardRef,
    Input
} from "@chakra-ui/react";

import { FieldError } from "react-hook-form";
import { NumericFormat } from "react-number-format";

type CurrencyInputFieldProps = {
    label?: string;
    error?: FieldError;
    placeholder?: string;
    compulsory?: boolean;
    labelClassName?: string;
    className?: string;
    value?: number | null;
    onChange?: (value: number | undefined) => void;
    onBlur?: () => void;
};

export const CurrencyInputField = forwardRef((props: CurrencyInputFieldProps, ref) => {
    const { 
        label,
        error,
        placeholder,
        compulsory,
        labelClassName,
        className,
        value,
        onChange,
        onBlur,
    } = props;

    return (
        <FormControl>
            {label && (
                <FormLabel className={labelClassName ?? "font-baloo text-sm lg:text-lg"}>
                    {label}
                    {compulsory && <span className="text-red-500"> *</span>}
                </FormLabel>
            )}

            <NumericFormat
                customInput={Input}
                inputMode="numeric"
                thousandSeparator=","
                bg="white"
                placeholder={placeholder}
                className={`mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm lg:text-base ${className ?? ""}`}
                getInputRef={ref}
                value={value ?? ""}
                onBlur={onBlur}
                onValueChange={(values) => {
                    onChange?.(values.floatValue);
                }}
            />

            {error && (
                <FormHelperText className="text-red-500 text-left text-xs mt-1">
                    {error.message}
                </FormHelperText>
            )}
        </FormControl>
    );
});