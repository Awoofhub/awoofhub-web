"use client";
import { CreateOfferForm } from "@/components/offer/CreateOfferForm";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CreateOffersPage() {
  const router = useRouter();

  const onSuccess = () => {
    const redirect = "/";
    router.push(redirect);
  };

  return (
    <section className="xs:p-8">
      <div className="bg-white max-w-3xl mx-auto p-6 rounded-xl">
        <h1 className="mb-3 xs:mb-5 text-center text-xl md:text-2xl lg:text-3xl font-semibold text-black flex gap-2 items-center justify-center">
          Post New Offer{" "}
          <span className="text-primary">
            <Image src="/addPost.png" alt="add-post" width={30} height={30} className="w-6 md:w-7 lg:w-8"/>
          </span>
        </h1>
        <hr className="xs:hidden border-muted/20 border"/>
        <CreateOfferForm onSuccess={onSuccess} />
      </div>
    </section>
  );
}
