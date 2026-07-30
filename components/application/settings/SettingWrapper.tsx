type Props = {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  destructive?: boolean;
};
export const SettingWrapper = ({
  title,
  subTitle,
  destructive = false,
  children,
}: Props) => {
  // TODO FIX Destructive STYLE ON Dark mode
  const style = destructive ? "bg-red-50 !border-red-200" : "";
  return (
    <div
      className={`${style} w-full flex flex-col gap-6 sm:gap-4 sm:flex-row justify-between border border-border py-8 px-12 items-center rounded-lg`}
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subTitle && (
          <p className="text-smibold text-foreground/75">{subTitle}</p>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};
