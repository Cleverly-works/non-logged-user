import React from "react";
import { Stack, Typography } from "@mui/material";

import { colors } from "../../../const";

const styles: Record<string, object> = {
  mediaList: {
    width: "inherit",
    padding: "10px 0px",
  },
  mediaLinkWrapper: {
    color: colors.defaultWhite,
    marginRight: "10px",
  },
  mediaLink: {
    width: "100px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    color: colors.defaultWhite,
    fontWeight: 600,
    pointerEvents: "none",
  },
};

type MediaDisplayProps = {
  mediaList: { caption: string; media: File; type: string }[];
  sx?: object;
};

const MediaDisplay: React.FC<MediaDisplayProps> = ({
  sx: outerSx = {},
  mediaList = [],
}) => {
  const slicedMediaList =
    mediaList?.length >= 3 ? mediaList.slice(0, 2) : mediaList;

  if (!mediaList.length) {
    return null;
  }

  return (
    <Stack direction="row" sx={{ ...styles.mediaList, ...outerSx }}>
      {slicedMediaList.map((attachment: any, ndx: number) => (
        <a
          href={URL.createObjectURL(attachment)}
          style={styles.mediaLinkWrapper}
          target="_blank"
          rel="noreferrer"
          key={ndx}
        >
          <Typography sx={styles.mediaLink}>{attachment?.name}</Typography>
        </a>
      ))}
      {slicedMediaList.length !== mediaList.length && (
        <Typography typography="subtile1" mr={1}>
          + {mediaList.length - slicedMediaList.length}
        </Typography>
      )}
    </Stack>
  );
};

export default MediaDisplay;
