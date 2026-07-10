import Image from 'next/image';

export default function SignupHero() {
    return (
        <>
            {/* Mobile */}
            <div className="block xs:hidden w-full relative h-[230px]">
                <Image
                    src="/signupHeroS.svg"
                    alt="Welcome to AwoofHub"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 flex items-center justify-center px-4">
                    <div className="bg-primary/30 backdrop-blur-[30px] rounded-lg px-4 py-1 mt-28 text-center">
                        <h2 className="text-white font-bold text-xl xxs:text-2xl font-baloo">
                            WELCOME TO AWOOFHUB
                        </h2>
                        <p className="text-white text-sm font-medium">
                            Deals discovery made simpler
                        </p>
                    </div>
                </div>
            </div>

            {/* Tablet */}
            <div className="hidden xs:block lg:hidden w-full relative h-[290px]">
                <Image
                    src="/signupHeroM.svg"
                    alt="Welcome to AwoofHub"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 flex items-center justify-center px-4">
                    <div className="bg-primary/30 backdrop-blur-[30px] rounded-[10px] px-6 py-3 text-center">
                        <h2 className="text-white font-bold text-3xl font-baloo">
                            WELCOME TO AWOOFHUB
                        </h2>
                        <p className="text-white text-base font-medium">
                            Deals discovery made simpler
                        </p>
                    </div>
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <Image
                    src="/signupHero.svg"
                    alt="Welcome to AwoofHub"
                    width={800}
                    height={700}
                    className="object-cover"
                    priority
                />
            </div>
        </>
    );
}