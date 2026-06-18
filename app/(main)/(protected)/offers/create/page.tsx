"use client"
import { CreateOfferForm } from "@/components/offer/CreateOfferForm";
import { useRouter } from "next/navigation";
import { MdPostAdd } from "react-icons/md";

export default function CreateOffersPage() {
    const router = useRouter();

    const onSuccess = () => {
        const redirect = "/offers";
        router.push(redirect);
    }

    return (
        <section className="bg-white p-4 sm:p-8">
            <div className="text-center mb-5 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex gap-2 items-center justify-center">
                    Post New Offer <span className="text-orange-600"><MdPostAdd size={30} /></span>
                </h1>
            </div>
            <CreateOfferForm onSuccess={onSuccess} />
        </section>
    );
}