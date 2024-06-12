import React from "react";
import { Box, Typography } from "@mui/material";
import { colors } from "../../../const";

const styles: Record<string, any> = {
  wrapper: (isSelected: boolean, blurred: boolean) => ({
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "130px",
    height: "130px",
    margin: "10px",
    padding: "20px",
    boxSizing: "border-box",
    opacity: blurred ? 0.5 : 1,
    ...(isSelected
      ? { border: `1px ${colors.mainBlue} solid`, borderRadius: "15px" }
      : {
          ":hover": {
            border: `1px ${colors.mainBlue} solid`,
            borderRadius: "15px",
          },
        }),
  }),
  image: {
    width: "80px",
    height: "80px",
  },
};

type IssueTypeProps = {
  id: number;
  label: string;
  imageLink: string;
  isSelected: boolean;
  blurred: boolean;
  onSelectIssueType: ({ id, imageLink, label }: any) => any;
};

const IssueType: React.FC<IssueTypeProps> = ({
  id,
  label,
  onSelectIssueType,
  imageLink,
  blurred,
  isSelected,
}) => {
  return (
    <Box
      sx={styles.wrapper(isSelected, blurred)}
      onClick={() => onSelectIssueType({ id, imageLink, label })}
    >
      <img src={imageLink} alt="..." style={styles.image} />
      <Typography typography="subtitle1">{label}</Typography>
    </Box>
  );
};

export default IssueType;
