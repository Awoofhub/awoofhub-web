"use client"
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

export const DatePickerField = ({ label, error, compulsory, value, onChange, labelClassName }: any) => {

  // Get 'now' so we can block the past
  const today = dayjs().add(1, 'day');

  const formattedValue = value ? dayjs(value) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl isInvalid={!!error} className="w-full">
        {label && (
          <FormLabel className={labelClassName ?? "font-baloo text-sm lg:text-lg"}>
            {label} {compulsory && <span className="text-red-500">*</span>}
          </FormLabel>
        )}

        <DatePicker
          value={formattedValue}
          onChange={(newValue) => onChange(newValue)}
          minDate={today}
          slotProps={{
            textField: {
              variant: 'standard',
              fullWidth: true,
              slotProps: {
                input: {
                  disableUnderline: true,
                  className: `!mt-2 !w-full !px-3 !py-1 xxs:!py-0.5 lg:!py-1 !bg-white !border ${error ? '!border-red-500' : '!border-gray-300'
                    } !rounded-md !shadow-sm text-sm lg:text-base focus-within:!border-orange-500`,
                },
                htmlInput: {
                  placeholder: "Select date",
                  className: "!font-baloo text-sm lg:text-base !placeholder-gray-400",
                }
              }
            },
            desktopPaper: {
              className: "!font-baloo",
            },
          }}
        />

        {error && (
          <FormHelperText className="text-red-500 text-left text-xs mt-1">
            {error.message || "Invalid date selected"}
          </FormHelperText>
        )}
      </FormControl>
    </LocalizationProvider>
  );
};