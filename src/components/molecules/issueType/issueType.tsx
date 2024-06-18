import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";

import defaultIssueIcon from "../../../images/icon.svg";
import { colors } from "../../../const";

const styles: Record<string, any> = {
  wrapper: (
    isWidth425pxOrLess: boolean,
    isSelected: boolean,
    blurred: boolean,
    displayMode: boolean,
  ) => ({
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    ...(isWidth425pxOrLess
      ? { width: "120px", height: "120px" }
      : { width: "180px", height: "180px" }),
    ...(!displayMode ? { margin: "10px", padding: "20px" } : {}),
    boxSizing: "border-box",
    opacity: blurred ? 0.5 : 1,
    ...(isSelected
      ? { border: `1px ${colors.mainBlue} solid`, borderRadius: "15px" }
      : !displayMode && {
          ":hover": {
            border: `1px ${colors.mainBlue} solid`,
            borderRadius: "15px",
          },
        }),
  }),
  image: (isWidth425pxOrLess: boolean) => ({
    ...(isWidth425pxOrLess
      ? { width: "80px", height: "80px" }
      : { width: "120px", height: "120px" }),
  }),
};

type IssueTypeProps = {
  id: number;
  name: string;
  imageLink: string;
  isSelected?: boolean;
  blurred?: boolean;
  displayMode?: boolean;
  onSelectIssueType?: ({ id, imageLink, name }: any) => any;
};

const IssueType: React.FC<IssueTypeProps> = ({
  id,
  name,
  onSelectIssueType,
  imageLink,
  blurred = false,
  displayMode = false,
  isSelected = false,
}) => {
  const isWidth425pxOrLess = useMediaQuery("(max-width: 425px)");
  return (
    <Box
      sx={styles.wrapper(isWidth425pxOrLess, isSelected, blurred, displayMode)}
      onClick={() =>
        onSelectIssueType &&
        !displayMode &&
        onSelectIssueType({ id, imageLink, name })
      }
    >
      <img
        src={imageLink || defaultIssueIcon}
        alt="..."
        style={styles.image(isWidth425pxOrLess)}
      />
      <Typography typography="subtitle1">{name}</Typography>
    </Box>
  );
};

export default IssueType;
