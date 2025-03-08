import Dashboard from "../online-course-management/page";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <Dashboard>{children}</Dashboard>
    </div>
  );
};

export default Layout;
