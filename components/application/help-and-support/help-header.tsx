import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

const HelpHeader = () => {
  return (
    <div className="flex justify-center ">
      <div className="flex gap-1 flex-col items-center">
        <h3 className="md:text-2xl font-semibold">Need Assistance?</h3>
        <p>
          Find answers, explore guides, or get in touch with our support team.
        </p>
        <div>
          <InputGroup className="max-w-72 min-w-50 mt-4">
            <InputGroupInput placeholder="Search ..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </div>
  );
};
export default HelpHeader;
