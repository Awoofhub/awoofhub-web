"use client"
import { Button } from '@/components/button/Button';
import { InputField } from '@/components/form/InputField';
import { API_URL } from '@/config/constants';
import { useSignup } from '@/features/auth/useSignup';
import { SignupFormProps } from '@/types/form-props';
import { Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FcGoogle } from "react-icons/fc";

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

export default function SignupForm({ onSuccess }: SignupFormProps) {

    const signup = useSignup({ onSuccess });

    // Initialize react-hook-form with validation rules
    const { register, handleSubmit, formState, getValues } = useForm<SignupFormData>();

    const onSubmit = (data: SignupFormData) => {
        const { confirmPassword, ...signupData } = data;
        signup.submit(signupData);
    };

    const handleGoogleLogin = () => {
        window.location.assign(`${API_URL}/v1/auth/google`);
    };

    return (
        <>
            <div className="text-center mb-5">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Join the <span className="text-orange-600">deal hunter!</span>
                </h1>
                <p className="text-sm mt-1 text-slate-500">
                    Create a free account to save deals and get personalized recommendations.
                </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Full Name"
                    placeholder="Enter your name"
                    compulsory={true}
                    type="text"
                    icon={<User size={18} color={"gray"} />}
                    {...register('name', { required: 'Full name is required' })}
                    error={formState.errors['name']}
                />

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
                    placeholder="***************"
                    icon={<Lock size={18} color={"gray"} />}
                    {...register('password', {
                        required: 'Password field cannot be empty',
                    })}
                    error={formState.errors['password']}
                />

                <InputField
                    label="Confirm Password"
                    type="password"
                    compulsory={true}
                    placeholder="***************"
                    icon={<Lock size={18} color={"gray"} />}
                    {...register('confirmPassword', {
                        required: 'Confirm Password field cannot be empty',
                        validate: (value) =>
                            value === getValues('password') || 'Passwords do not match',
                    })}
                    error={formState.errors['confirmPassword']}
                />

                <div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                        By signing up, you agree to our{" "}
                        <Link href="/terms" className="text-orange-600 hover:underline">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-orange-600 hover:underline">
                            Privacy Policy
                        </Link>.
                    </p>
                </div>

                <div>
                    <Button
                        isLoading={signup.isPending}
                        isDisabled={signup.isPending}
                        type="submit"
                    >
                        Create Account
                    </Button>
                </div>


                <div className="relative my-3 w-full">
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
                        Already have an account?{' '}
                        <Link href="/login" className="text-[#FF5700] font-semibold hover:underline">Log In</Link>
                    </p>
                </div>
            </form >
        </>
    );
};