// Next
import Link from "next/link";
// Components
import UserSessionMenu from "@/ui/layout/user-session-menu";
// Icons
import { SiNeteasecloudmusic } from "react-icons/si";

export default function Header() {
  return (
    <header className="container-main bg-primary py-10">
      <div className="flex select-none items-center justify-between">
        <Link href="/" prefetch={false}>
          <SiNeteasecloudmusic className="size-11 text-white" />
        </Link>

        <UserSessionMenu />
      </div>
    </header>
  );
}
