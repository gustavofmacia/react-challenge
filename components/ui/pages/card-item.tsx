import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/card";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function CardItem({ title, children }: Props) {
  return (
    <Card className="max-w-120">
      <CardHeader>
        <CardTitle className="z-0 text-left text-1.2xl font-bold text-primary md:text-2xl 2xl:text-2.6xl">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="">{children}</CardContent>
    </Card>
  );
}
