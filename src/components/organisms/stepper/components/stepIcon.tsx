import { StepIconProps, styled } from "@mui/material";
import {
  HomeOutlined,
  LuggageOutlined,
  DescriptionOutlined,
  PersonOutlined,
} from "@mui/icons-material";

import { colors } from "../../../../const";

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState }) => ({
  backgroundColor: colors.lightBlue,
  zIndex: 1,
  color: colors.defaultWhite,
  width: 70,
  height: 70,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: colors.activeGreen,
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundColor: colors.activeGreen,
  }),
}));

const styles: Record<string, object> = {
  icon: { width: "35px", height: "30px" },
};

export function StepIcon({
  active,
  completed,
  className,
  icon,
}: StepIconProps) {
  const icons: { [index: string]: React.ReactElement } = {
    1: <HomeOutlined sx={styles.icon} />,
    2: <LuggageOutlined sx={styles.icon} />,
    3: <DescriptionOutlined sx={styles.icon} />,
    4: <PersonOutlined sx={styles.icon} />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}
