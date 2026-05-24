"use client"
import { Button } from '@/components/button/Button';
import { InputField } from '@/components/form/InputField';
import { API_URL } from "@/config/constants";
import { useLogin } from '@/features/auth/useLogin';
import { LoginData } from '@/types/auth';
import { LoginFormProps } from '@/types/form-props';
import { Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FcGoogle } from "react-icons/fc";

export const LoginForm = ({
    onSuccess,
}: LoginFormProps) => {
    const login = useLogin({ onSuccess });

    const { register, handleSubmit, formState } = useForm<LoginData>();

    const onSubmit = (data: LoginData) => {
        login.submit(data);
    };

    const handleGoogleLogin = () => {
          window.location.assign(`${API_URL}/v1/auth/google`);
    };

    return (
        <div className="w-full mx-auto">
            <div className="text-center mb-5">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Welcome back, <span className="text-orange-600">deal hunter!</span>
                </h1>
                <p className="text-sm mt-1 text-slate-500">
                    Manage your offers or save offers and get personalised recommendations
                </p>
            </div>

            <form className="mt-7 space-y-6" onSubmit={handleSubmit(onSubmit)}>

                <InputField
                    label="Email Address"
                    placeholder="johndebby@email.com"
                    compulsory={true}
                    type="email"
                    icon={<Mail size={18} color={"gray"} />}
                    {...register('email')}
                    error={formState.errors['email']}
                />

                <InputField
                    label="Password"
                    type="password"
                    compulsory={true}
                    icon={<Lock size={18} color={"gray"} />}
                    placeholder="***************"
                    {...register('password', {
                        required: 'Password field cannot be empty',
                    })}
                    error={formState.errors['password']}
                />

                <div className="flex justify-end items-center">

                    <div className="flex items-center">
                        <Link href="/forgot-password " className="ml-2 text-sm text-orange-600 hover:text-red-600 cursor-pointer">
                            Forgot Password ?
                        </Link>
                    </div>
                </div>

                <div>
                    <Button
                        isLoading={login.isPending}
                        isDisabled={login.isPending}
                        type="submit"
                    >
                        Login
                    </Button>
                </div>

                 <div className="relative my-5 w-full">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">OR</span>
                    </div>
                </div>


                <Button onClick={handleGoogleLogin} type="button" variant="outline">
                    <FcGoogle size={20} />
                    Continue with Google
                </Button>


                <div className="text-center space-y-2">
                    <p className="text-gray-600 text-sm">
                        Don't have an account yet?{' '}
                        <Link href="/signup" className="text-[#FF5700] font-semibold hover:underline">Create one</Link>
                    </p>
                </div>

                {/* Guest Tip Box */}
                <div className="w-full mt-4 p-4 bg-[#FFF8F6] border border-gray-400 rounded-2xl flex items-center justify-center">
                    <p className="text-gray-600 text-sm text-center ">
                        <span className="mr-2">💡</span>
                        Tip: You can browse deals without signing in.{' '}
                        <Link href="/" className="text-[#FF5700] font-medium hover:underline">Continue as guest</Link>
                    </p>
                </div>

            </form >
        </div>
    );
};