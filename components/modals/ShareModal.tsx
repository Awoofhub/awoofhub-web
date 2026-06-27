import { Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";


interface Props {
    offerId: string;
}

export default function ShareModal({ offerId }: Props) {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);

    const url = typeof window !== "undefined"
        ? `${window.location.origin}/offers/${offerId}`
        : "";

    const copyLink = async () => {
        await navigator.clipboard.writeText(url);
        setShow(true);
        setTimeout(() => setShow(false), 2000);
        setOpen(false)
    };
 
    return (
        <>
            <div className="flex gap-4 text-[10px] xs:text-xs lg:text-sm text-black">
                <button onClick={() => setOpen(true)} className="cursor-pointer flex items-center gap-1 hover:text-blue-500 transition-colors">
                    <Share2 size={18} /> Share
                </button>
            </div>
            {show && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg">
                    Link copied!
                </div>
            )}
            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000">
                    <div className="bg-white w-full max-w-sm m-5 rounded-2xl p-4">

                        <h3 className="text-lg font-semibold mb-4">Share</h3>

                        <div className="grid grid-cols-4 gap-4 text-center text-sm sm:text-base">

                            <button className="flex flex-col items-center gap-3" onClick={copyLink}><Copy size={35} /> Copy</button>

                            <button
                                className="flex flex-col items-center gap-3"
                                onClick={() =>
                                    window.open(
                                        `https://wa.me/?text=${encodeURIComponent(url)}`
                                    )
                                }
                            >
                                <FaWhatsapp size={35} /> WhatsApp
                            </button>

                            <button
                                className="flex flex-col items-center gap-3"
                                onClick={() =>
                                    window.open(
                                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
                                    )
                                }
                            >
                                <FaFacebook size={35} /> Facebook
                            </button>

                            <button
                                className="flex flex-col items-center gap-3"
                                onClick={() =>
                                    window.open(
                                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`
                                    )
                                }
                            >
                                <BsTwitterX size={35} /> Twitter
                            </button>

                        </div>

                        <button
                            className="cursor-pointer rounded-md mt-6 bg-primary p-2 w-full text-white font-medium"
                            onClick={() => setOpen(false)}
                        >
                            Close
                        </button>

                    </div>
                </div>
            )}
        </>
    )

}


