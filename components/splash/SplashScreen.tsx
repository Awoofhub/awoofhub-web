import Image from "next/image";

export function SplashScreen() {
  return (
    <div className="xs:hidden fixed inset-0 z-50 bg-linear-to-b from-[#FE4F04] to-[#982F02] flex flex-col items-center justify-center gap-4">
      <Image src="/LogoWhite.png" width={200} height={48} alt="" />
    </div>
  );
}
