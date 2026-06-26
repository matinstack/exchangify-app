import BackButton from "@/components/auth/BackButton";
import Header from "@/components/auth/Header";
import OAth from "@/components/auth/OAth";

type CardWrapperProps = {
  headerTitle: string;
  headerSubTitle: string;
  children: React.ReactNode;
  oAuth: boolean;
  BackButtonHref: string;
  BackButtonTitle: string;
  BackButtonHrefTitle: string;
};
const CardWrapper = ({
  headerTitle,
  children,
  headerSubTitle,
  oAuth,
  BackButtonHref,
  BackButtonTitle,
  BackButtonHrefTitle,
}: CardWrapperProps) => {
  return (
    <div className={"py-11"}>
      <Header title={headerTitle} subTitle={headerSubTitle} />
      {children}
      <BackButton
        href={BackButtonHref}
        hrefTitle={BackButtonHrefTitle}
        title={BackButtonTitle}
      />
      {oAuth && <OAth />}
    </div>
  );
};

export default CardWrapper;
