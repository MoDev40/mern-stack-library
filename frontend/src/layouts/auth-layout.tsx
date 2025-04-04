import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="container mx-auto flex flex-col justify-center items-center h-screen">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
