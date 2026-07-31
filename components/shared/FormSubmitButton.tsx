import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  disabled: boolean;
  text: string;
  loadingText: string;
  className?: string;
} & React.ComponentPropsWithoutRef<"button">;

const FormSubmitButton = ({
  disabled,
  text,
  loadingText,
  className,
  ...props
}: Props) => {
  return (
    <Button
      className={`${className}`}
      variant="default"
      type="submit"
      disabled={disabled}
      {...props}
    >
      {disabled ? `${loadingText}` : `${text}`}
      {disabled && <Spinner />}
    </Button>
  );
};

export default FormSubmitButton;
