const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-4 md:px-8 lg:px-16">
      {children}
    </div>
  );
};

export default AppLayout;
