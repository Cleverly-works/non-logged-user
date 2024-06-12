// eslint-disable-next-line import/no-extraneous-dependencies
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { RoutesPath } from "./routes";
import { HomePage } from "../pages/home";

const router = createBrowserRouter([
  { path: RoutesPath.HOME, element: <HomePage /> },
  { path: RoutesPath.ANY, element: <div>Page not found 404</div> },
]);

export const MainRouter = () => <RouterProvider router={router} />;
