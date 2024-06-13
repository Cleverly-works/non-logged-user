// eslint-disable-next-line import/no-extraneous-dependencies
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { HomePage } from "../pages/home";
import { AcknowledgementPage } from "../pages/acknowledgment";

import { RoutesPath } from "./routes";

const router = createBrowserRouter([
  { path: RoutesPath.HOME, element: <HomePage /> },
  { path: RoutesPath.ACKNOWLEDGMENT, element: <AcknowledgementPage /> },
  { path: RoutesPath.ANY, element: <div>Page not found 404</div> },
]);

export const MainRouter = () => <RouterProvider router={router} />;
