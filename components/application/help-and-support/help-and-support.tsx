import { FAQ } from "./faq";
import HelpHeader from "./help-header";
import { QuickActions } from "./quick-actions";

const HelpAndSupport = () => {
  return (
    <div className="flex flex-col gap-12 my-6 mx-12 xl:mx-34">
      <HelpHeader />
      <QuickActions />
      <FAQ />
    </div>
  );
};
export default HelpAndSupport;
