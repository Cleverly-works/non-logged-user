import React, {
  SetStateAction,
  createContext,
  useState,
  Dispatch,
} from "react";

interface MainContextParams {
  generalAppParams: string;
  setGeneralAppParams: Dispatch<SetStateAction<string>>;
}

export const MainContext = createContext<MainContextParams>({
  generalAppParams: "",
  setGeneralAppParams: () => {},
});

type MainContextProps = {
  children: React.ReactNode;
};

const MainContextWrapper: React.FC<MainContextProps> = ({ children }) => {
  const [generalAppParams, setGeneralAppParams] = useState<string>("");

  return (
    <MainContext.Provider value={{ generalAppParams, setGeneralAppParams }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextWrapper;
