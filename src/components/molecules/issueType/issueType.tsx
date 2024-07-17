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
    justifyContent: displayMode ? "flex-start" : "center",
    padding: isWidth425pxOrLess ? "0px" : "20px",
    ...(isWidth425pxOrLess
      ? { width: "100px", height: "100px" }
      : { width: "150px", height: "150px" }),
    ...(!displayMode ? { margin: "10px" } : {}),
    boxSizing: "border-box",
    opacity: blurred ? 0.5 : 1,
    borderRadius: "15px",
    ...(isSelected
      ? {
          borderRadius: "15px",
          backgroundColor: colors.activeGreen,
        }
      : !displayMode && {
          ":hover": {
            backgroundColor: colors.activeGreen,
            borderRadius: "15px",
          },
        }),
    ...(displayMode ? { width: "250px" } : {}),
  }),
  image: (isWidth425pxOrLess: boolean) => ({
    ...(isWidth425pxOrLess
      ? { width: "50px", height: "50px" }
      : { width: "80px", height: "80px" }),
  }),
  label: (isWidth425pxOrLess: boolean) => ({
    width: isWidth425pxOrLess ? "60px" : "200px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    "&:hover": {
      width: "80px",
      textOverflow: "none",
    },
    textAlign: "center",
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
      <Typography typography="subtitle1" sx={styles.label(isWidth425pxOrLess)}>
        {name}
      </Typography>
    </Box>
  );
};

export default IssueType;
