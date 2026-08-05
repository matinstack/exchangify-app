import * as React from "react";
export const useDialogState = () => {
  const [open, setOpen] = React.useState(false);

  return {
    open,
    onOpenChange: setOpen,
    close: () => setOpen(false),
    show: () => setOpen(true),
  };
};

export type UseDialogState = ReturnType<typeof useDialogState>;
