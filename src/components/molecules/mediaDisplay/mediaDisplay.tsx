import React from "react";
import { Stack, Typography } from "@mui/material";

import { colors } from "../../../const";

const styles: Record<string, object> = {
  mediaList: {
    width: "inherit",
    padding: "10px 15px",
  },
  mediaLinkWrapper: {
    marginRight: "10px",
  },
  mediaLink: {
    color: colors.mainBlue,
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
      <Typography typography="subtitle1" mr={1}>
        Media:&nbsp;
      </Typography>
      {slicedMediaList.map(({ caption, media }) => (
        <a
          href={URL.createObjectURL(media)}
          style={styles.mediaLinkWrapper}
          target="_blank"
          rel="noreferrer"
        >
          <Typography sx={styles.mediaLink}>
            {caption || media?.name}
          </Typography>
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
