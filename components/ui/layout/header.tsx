// Next
import Link from "next/link";
// Components
import UserSessionMenu from "@/ui/layout/user-session-menu";
// Icons
import { SiNeteasecloudmusic } from "react-icons/si";

export default function Header() {
  return (
    <header className="bg-primary px-5 py-10 sm:mb-4 sm:px-8 sm:py-16 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
      <div className="flex select-none items-center justify-between">
        <Link href="/" prefetch={false}>
          <SiNeteasecloudmusic className="size-11 text-white" />
        </Link>

        <UserSessionMenu />
      </div>
    </header>
  );
}
