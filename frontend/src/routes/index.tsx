import LogIn from "@/components/auth/log-in";
import SignUp from "@/components/auth/sign-up";
import AuthLayout from "@/layouts/auth-layout";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, path: "/auth/log-in", element: <LogIn /> },
      { index: true, path: "/auth/sign-up", element: <SignUp /> },
    ],
  },
]);

export default router;
