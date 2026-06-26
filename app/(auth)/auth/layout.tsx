const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={"min-h-screen p-2 flex justify-center items-center"}>
      {children}
    </div>
  );
};

export default AuthLayout;
