import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  forwardRef,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Textarea,
} from '@chakra-ui/react';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';

import {
  FieldError,
  UseFormRegister,
} from 'react-hook-form';

export type InputFieldProps = {
  type?: 'text' | 'email' | 'password' | 'textarea';
  label?: string;
  textAreaRows?: number;
  error?: FieldError;
  icon?: React.ReactNode;
  placeholder?: string;
  compulsory?: boolean;
} & Partial<
  ReturnType<UseFormRegister<Record<string, unknown>>>
>;

export const InputField = forwardRef(
  (props: InputFieldProps, ref) => {
    const {
      type = 'text',
      label,
      error,
      icon,
      placeholder,
      textAreaRows=3,
      compulsory,
      ...inputProps
    } = props;


    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
      <FormControl>
        {label &&
          <FormLabel className="font-baloo text-sm lg:text-lg">
            {label}
            {compulsory && <span className="text-red-500"> *</span>}
          </FormLabel>}
          
        {type === 'text' ? (
          <Input
            bg="white"
            placeholder={placeholder}
            className={`mt-2 w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm lg:text-base `}
            {...inputProps}
            ref={ref}
          />
        ) : type === 'textarea' ? (
          <Textarea
            bg=" white"
            placeholder={placeholder}
            className={`mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm lg:text-base `}
            rows={textAreaRows}
            {...inputProps}
            ref={ref}
          />
        ) : type === 'password' ? (
          <InputGroup>
            {icon && (
              <InputLeftElement pointerEvents="none" className="mx-3 my-5.5">
                {icon}
              </InputLeftElement>
            )}
            <Input
              bg=" #F6F7F8"
              pr="4.5rem"
              className={`mt-2 w-full px-3 py-2 ${icon ? 'pl-12' : ''} border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-base sm:text-lg font-baloo`}
              type={show ? 'text' : 'password'}
              placeholder={placeholder}
              {...inputProps}
              ref={ref}
            />
            <InputRightElement className="mx-3 my-5.5 text-gray-500">
              <Button onClick={handleClick}>
                {show ? <Eye size={20} /> : <EyeClosed size={20} />}
              </Button>
            </InputRightElement>
          </InputGroup>
        ) : (
          <InputGroup>
            {icon && (
              <InputLeftElement pointerEvents="none" className="mx-3 my-5.5">
                {icon}
              </InputLeftElement>
            )}
            <Input
              bg="#F6F7F8"
              type={type}
              placeholder={placeholder}
              className={`mt-2 w-full px-3 py-2 ${icon ? 'pl-12' : ''} border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-base sm:text-lg font-baloo`}
              {...inputProps}
              ref={ref}
            />
          </InputGroup>
        )}
        {error && (
          <FormHelperText className="text-red-500 text-left text-xs mt-1">
            {error.message}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);