export enum Routes {
  HOME = "HOME",
  ACKNOWLEDGMENT = "ACKNOWLEDGMENT",
  ANY = "ANY",
  ERROR = "ERROR",
}

export const RoutesPath: Record<Routes, string> = {
  [Routes.HOME]: "/",
  [Routes.ACKNOWLEDGMENT]: "/acknowledgment",
  [Routes.ANY]: "*",
  [Routes.ERROR]: "/error",
};
