"use client";

type SuccessModalProps = {
    onDone: () => void;
};

export const SuccessModal = ({ onDone }: SuccessModalProps) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

        <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-sm px-8 py-10 flex flex-col items-center text-center">

            <div className="relative mb-6">

                <svg className="absolute -top-4 -left-4 w-6 h-6 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" />
                </svg>
                <svg className="absolute -top-2 -right-3 w-4 h-4 text-green-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" />
                </svg>
                <svg className="absolute bottom-0 -right-5 w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" />
                </svg>
                <svg className="absolute bottom-2 -left-5 w-3 h-3 text-green-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" />
                </svg>

                <div className="w-24 h-28 bg-gray-100 rounded-2xl flex items-center justify-center shadow-inner">
                    {/* Green circle with white tick */}
                    <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                        <svg
                            className="w-7 h-7 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                </div>
            </div>


            <h2 className="font-baloo text-2xl font-bold text-gray-900 mb-2">
                Submitted!
            </h2>
            <p className="font-baloo text-base text-gray-500 leading-relaxed">
                We&apos;re reviewing your post.<br />
                You&apos;ll receive an update within 24 hours.
            </p>
            <button
                onClick={onDone}
                className="mt-7 w-full h-12 rounded-lg pointer bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white font-baloo text-lg font-semibold shadow-md"
            >
                Done
            </button>
        </div>
    </div>
);
