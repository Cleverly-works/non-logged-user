import React, {
  SetStateAction,
  createContext,
  useState,
  Dispatch,
} from "react";

interface MainContextParams {
  generalAppParams: string;
  currentStep: number;
  hasShowedWelcomeMobiledScreen: boolean;
  setHasShowedWelcomeMobileScreen: Dispatch<SetStateAction<boolean>>;
  setGeneralAppParams: Dispatch<SetStateAction<string>>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export const MainContext = createContext<MainContextParams>({
  generalAppParams: "",
  currentStep: -1,
  hasShowedWelcomeMobiledScreen: false,
  setHasShowedWelcomeMobileScreen: () => {},
  setGeneralAppParams: () => {},
  setCurrentStep: () => {},
});

type MainContextProps = {
  children: React.ReactNode;
};

const MainContextWrapper: React.FC<MainContextProps> = ({ children }) => {
  const [generalAppParams, setGeneralAppParams] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [hasShowedWelcomeMobiledScreen, setHasShowedWelcomeMobileScreen] =
    useState<boolean>(false);

  return (
    <MainContext.Provider
      value={{
        currentStep,
        generalAppParams,
        hasShowedWelcomeMobiledScreen,
        setGeneralAppParams,
        setCurrentStep,
        setHasShowedWelcomeMobileScreen,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextWrapper;
