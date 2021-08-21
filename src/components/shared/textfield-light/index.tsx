/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

import { makeStyles, TextField } from "@material-ui/core";

import "react-toastify/dist/ReactToastify.min.css";

interface IProps {
  required?: boolean;
  label: string;
  register?: any;
  id?: string;
  type?: string;
  shrinkLabel?: boolean;
  style?: any;
  className?: any;
  value?: any;
  inputRef?: any;
  endAdornment?: any;
  multiline?: boolean;
  maxRows?: number;
  rows?: number;
}

const LightTextfield = (props: IProps) => {
  const useTexfieldStyle = makeStyles({
    fieldRoot: {
      "&$fieldFocused $fieldNotchedOutline": {
        borderColor: `var(--theme-red) !important`,
        borderWidth: "1px",
      },
      color: "#000",
      fontSize: 14,
    },
    fieldFocused: {},
    fieldNotchedOutline: {
      borderColor: "rgb(214 214 214) !important",
    },
    labelRoot: {
      "&$labelFocused": {
        color: `var(--theme-red) !important`,
      },

      color: "rgb(214 214 214)",
    },
    labelFocused: {},
  });

  const textFieldClasses = useTexfieldStyle();

  return (
    <TextField
      fullWidth
      multiline={props.multiline}
      maxRows={props.maxRows}
      rows={props.rows}
      required={props.required || false}
      label={props.label}
      variant="outlined"
      id={props.id}
      type={props.type}
      className={props.className}
      style={props.style}
      value={props.value}
      inputRef={props.inputRef}
      InputProps={{
        classes: {
          root: textFieldClasses.fieldRoot,
          focused: textFieldClasses.fieldFocused,
          notchedOutline: textFieldClasses.fieldNotchedOutline,
        },
        inputProps: props.register ? { ...props.register } : undefined,
        endAdornment: props.endAdornment,
      }}
      InputLabelProps={{
        classes: {
          root: textFieldClasses.labelRoot,
          focused: textFieldClasses.labelFocused,
        },
        shrink: true,
      }}
    />
  );
};

export default LightTextfield;
