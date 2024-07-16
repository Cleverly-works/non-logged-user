import React, {
  SetStateAction,
  createContext,
  useState,
  Dispatch,
} from "react";

interface MainContextParams {
  generalAppParams: string;
  currentStep: number;
  setGeneralAppParams: Dispatch<SetStateAction<string>>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export const MainContext = createContext<MainContextParams>({
  generalAppParams: "",
  currentStep: 0,
  setGeneralAppParams: () => {},
  setCurrentStep: () => {},
});

type MainContextProps = {
  children: React.ReactNode;
};

const MainContextWrapper: React.FC<MainContextProps> = ({ children }) => {
  const [generalAppParams, setGeneralAppParams] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <MainContext.Provider
      value={{
        currentStep,
        generalAppParams,
        setGeneralAppParams,
        setCurrentStep,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextWrapper;
