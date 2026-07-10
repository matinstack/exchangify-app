import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const FormSubmitButton = ({
  disabled,
  text,
  loadingText,
  className,
}: {
  disabled: boolean;
  text: string;
  loadingText: string;
  className?: string;
}) => {
  return (
    <Button
      className={`${className}`}
      variant="default"
      type="submit"
      disabled={disabled}
    >
      {disabled ? `${loadingText}` : `${text}`}
      {disabled && <Spinner />}
    </Button>
  );
};

export default FormSubmitButton;
