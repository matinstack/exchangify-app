import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const FormSubmitButton = ({
  disabled,
  text,
  loadingText,
}: {
  disabled: boolean;
  text: string;
  loadingText: string;
}) => {
  return (
    <Button variant="default" type="submit" disabled={disabled}>
      {disabled ? `${loadingText}` : `${text}`}
      {disabled && <Spinner />}
    </Button>
  );
};

export default FormSubmitButton;
