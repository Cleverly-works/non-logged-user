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
    flexDirection: displayMode ? "row" : "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    ...(isWidth425pxOrLess
      ? { width: "80px", height: "80px" }
      : { width: "150px", height: "150px" }),
    ...(!displayMode ? { margin: "10px", padding: "20px" } : {}),
    boxSizing: "border-box",
    opacity: blurred ? 0.5 : 1,
    borderRadius: "15px",
    ...(isSelected
      ? {
          border: `1px ${colors.mainBlue} solid`,
          borderRadius: "15px",
          backgroundColor: colors.activeGreen,
        }
      : !displayMode && {
          ":hover": {
            border: `1px ${colors.mainBlue} solid`,
            borderRadius: "15px",
          },
        }),
  }),
  image: (isWidth425pxOrLess: boolean) => ({
    ...(isWidth425pxOrLess
      ? { width: "50px", height: "50px" }
      : { width: "80px", height: "80px" }),
  }),
  label: {
    width: "100px",
    textAlign: "center",
  },
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
      <Typography typography="subtitle1" sx={styles.label}>
        {name}
      </Typography>
    </Box>
  );
};

export default IssueType;
