import { SyntheticEvent, useEffect, useState } from "react";

import {
  Chip,
  CircularProgress,
  Autocomplete as MuiAutocomplete,
  SxProps,
} from "@mui/material";

import { TextField } from "../../atoms";

type SearchAutocompleteProps = {
  multiple?: boolean;
  limitTags?: number;
  filterSelectedOptions?: boolean;
  color: string;
  loading?: boolean;
  value?: any;
  sx?: SxProps;
  onChange?: (_: SyntheticEvent, newValue: any) => any;
  options: {
    value: any;
    label: string;
  }[];
  onOpen?: (e: SyntheticEvent) => any;
  setSearch?: (inputValue: string) => any;
  disabled?: boolean;
  textFieldProps?: {
    label?: string;
    variant?: "standard" | "outlined";
    color?: string;
    error?: boolean;
    helperText?: string;
  };
};

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = (props) => {
  const { loading, setSearch, textFieldProps, ...rest } = props;

  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (setSearch) {
      const delayDebounceFn = setTimeout(() => {
        setSearch(inputValue);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [inputValue, setSearch]);

  return (
    <MuiAutocomplete
      {...rest}
      loading={loading}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      getOptionLabel={(option) => option.label}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip size="small" label={option.label} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          color={(textFieldProps?.color || "secondary") as any}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchAutocomplete;
