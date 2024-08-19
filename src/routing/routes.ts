export enum Routes {
  HOME = "HOME",
  ACKNOWLEDGMENT = "ACKNOWLEDGMENT",
  ANY = "ANY",
  ERROR = "ERROR",
  WELCOME_MOBILE = "WELCOME_MOBILE",
}

export const RoutesPath: Record<Routes, string> = {
  [Routes.HOME]: "/",
  [Routes.ACKNOWLEDGMENT]: "/acknowledgment",
  [Routes.ANY]: "*",
  [Routes.ERROR]: "/error",
  [Routes.WELCOME_MOBILE]: "/welcome",
};
