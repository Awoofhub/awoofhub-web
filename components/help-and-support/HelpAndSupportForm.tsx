import { Button } from "@/components/button/Button";
import { useHelpAndSupport } from "@/features/help-and-support/useHelpAndSupport";
import { HelpAndSupportData } from "@/types/help-and-support";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormSelectDropdown } from "../form/FormSelectDropdown";
import { InputField } from "../form/InputField";
import HelpAndSupportSuccessModal from "../modals/help-and-support/HelpAndSupportSuccessModal";

const LABEL_CLS = "font-medium font-baloo text-base lg:text-lg"

const CATEGORY = [
    { value: undefined, label: "Select option" },
    { label: "Account & Login", value: "accountAndLogin" },
    { label: "Deals & Posts", value: "dealsAndPosts" },
    { label: "Payments & Transactions", value: "paymentsAndTransactions" },
    { label: "Orders & Purchases", value: "ordersAndPurchases" },
    { label: "Business Account", value: "businessAccount" },
    { label: "Advertising", value: "advertising" },
    { label: "Rewards & Earnings", value: "rewardsAndEarnings" },
    { label: "Technical Issue", value: "technicalIssue" },
    { label: "Other", value: "other" },
];

export default function HelpAndSupportForm() {
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const { register, handleSubmit, formState, control, reset } = useForm<HelpAndSupportData>();

    const onSuccess = () => {
        reset()
        setShowSuccessModal(true);
    };

    const { submit, isPending } = useHelpAndSupport({ onSuccess });

    const onSubmit = (data: HelpAndSupportData) => {
        submit(data);
    };


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                <InputField
                    label="Full name"
                    placeholder="John Debby"
                    labelClassName={LABEL_CLS}
                    compulsory
                    type="text"
                    {...register("name", { required: "Full name is required" })}
                    error={formState.errors.name}
                />

                <InputField
                    label="Email address"
                    placeholder="you@email.com"
                    compulsory
                    labelClassName={LABEL_CLS}
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                        },
                    })}
                    error={formState.errors.email}
                />

                <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Please select an option", }}
                    render={({ field, fieldState }) => (
                        <FormSelectDropdown
                            label="Category"
                            labelClassName={LABEL_CLS}
                            data={CATEGORY}
                            value={field.value}
                            compulsory={true}
                            onChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />

                <InputField
                    label="Message"
                    placeholder="Provide a detailed description of your issue..."
                    labelClassName="font-medium! font-baloo! text-base! lg:text-lg! leading-tight!"
                    type="textarea"
                    compulsory
                    {...register("message", {
                        required: "This section is required",
                        minLength: {
                            value: 20,
                            message: "Must not be less than 20 characters",
                        },
                    })}
                    error={formState.errors.message}
                />

                <Button type="submit" isLoading={isPending} isDisabled={isPending}>
                    Submit
                </Button>
            </form>

            <HelpAndSupportSuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />

        </>
    );
};
