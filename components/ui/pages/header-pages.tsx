import Link from "next/link";
type Props = {
  title: string;
  pathname: string;
};

export default function HeaderPages({ title, pathname }: Props) {
  return (
    <header className="relative flex h-28 w-full items-center text-primary 2xl:h-32">
      <Link href={`/${pathname}`}>
        <h1 className="z-0 text-2xl font-bold md:text-2.8xl 2xl:text-3xl">
          {title}
        </h1>
      </Link>
    </header>
  );
}
