// Next
import Link from "next/link";
// Components
import UserSessionMenu from "@/ui/layout/user-session-menu";
// Icons
import { SiNeteasecloudmusic } from "react-icons/si";

export default function Header() {
  return (
    <header className="container-main bg-primary py-10">
      <div className="flex items-center justify-between select-none">
        <Link href="/">
          <SiNeteasecloudmusic className="size-11 text-white" />
        </Link>

        <UserSessionMenu />
      </div>
    </header>
  );
}
