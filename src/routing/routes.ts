export enum Routes {
  HOME = "HOME",
  ANY = "ANY",
}

export const RoutesPath: Record<Routes, string> = {
  [Routes.HOME]: "/",
  [Routes.ANY]: "*",
};
