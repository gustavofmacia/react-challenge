import Header from "@/ui/pages/header-pages";

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default async function PagesLayout(props: Props) {
  return (
    <article className="container-main mt-4">
      <Header title="Bands" pathname="bands" />

      <div className="container-reduce">
        {props.modal}
        {props.children}
      </div>
    </article>
  );
}
