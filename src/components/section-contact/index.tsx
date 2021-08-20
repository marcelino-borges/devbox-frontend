import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import "@fontsource/roboto";
// import {
//   GoogleReCaptchaProvider,
//   GoogleReCaptcha,
//   useGoogleReCaptcha,
// } from "react-google-recaptcha-v3";
import emailjs, { init } from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";

import { INNER_DIV_WITH_MARGINS } from "../../Utils/patterns";

import "react-toastify/dist/ReactToastify.min.css";
import "./style.css";

const SectionContact = () => {
  const { register, handleSubmit, reset } = useForm();
  // const { executeRecaptcha } = useGoogleReCaptcha();

  const useTexfieldStyle = makeStyles({
    fieldRoot: {
      "&$fieldFocused $fieldNotchedOutline": {
        borderColor: `white !important`,
        borderWidth: "1px",
      },
      color: "#fff",
      fontSize: 14,
    },
    fieldFocused: {},
    fieldNotchedOutline: {
      borderColor: "var(--theme-dark-red) !important",
    },
    labelRoot: {
      "&$labelFocused": {
        color: `white !important`,
      },
      color: "white",
    },
    labelFocused: {},
  });

  const textFieldClasses = useTexfieldStyle();

  const toastifySuccess = () => {
    toast("Form sent!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: "submit-feedback success",
      toastId: "notifyToast",
    });
  };

  const onSubmit = async (data: any) => {
    // console.log(
    //   "process.env.REACT_APP_RECAPTCHA_KEY: ",
    //   process.env.REACT_APP_RECAPTCHA_KEY
    // );
    //handleReCaptchaVerify();

    try {
      const templateParams = {
        name: data.name,
        email: data.email,
        message: data.message,
      };
      if (
        !process.env.REACT_APP_EMAILJS_SERVICE_ID ||
        !process.env.REACT_APP_EMAILJS_TEMPLATE_ID ||
        !process.env.REACT_APP_EMAILJS_USER_ID
      )
        return;

      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_USER_ID
      );
      reset();
      toastifySuccess();
    } catch (e) {
      console.log(e);
    }
  };

  // const handleReCaptchaVerify = useCallback(async () => {
  //   if (!executeRecaptcha) {
  //     console.log("Execute recaptcha not yet available");
  //   } else {
  //     const token = await executeRecaptcha("submit");
  //     console.log("token: ", token);
  //     // Do whatever you want with the token
  //   }
  // }, []);

  // useEffect(() => {
  //   handleReCaptchaVerify();
  // }, [handleReCaptchaVerify]);

  useEffect(() => {
    if (
      process.env.REACT_APP_EMAILJS_USER_ID &&
      process.env.REACT_APP_EMAILJS_USER_ID.length > 0
    )
      init(process.env.REACT_APP_EMAILJS_USER_ID);
  }, []);

  const renderForm = (): JSX.Element => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid container item style={{ marginRight: "20px" }}>
            <TextField
              fullWidth
              required
              label="Name"
              variant="outlined"
              {...register("name")}
              id="contact"
              className="TextfieldContact"
              InputProps={{
                classes: {
                  root: textFieldClasses.fieldRoot,
                  focused: textFieldClasses.fieldFocused,
                  notchedOutline: textFieldClasses.fieldNotchedOutline,
                },
              }}
              InputLabelProps={{
                classes: {
                  root: textFieldClasses.labelRoot,
                  focused: textFieldClasses.labelFocused,
                },
              }}
            />
          </Grid>
          <Grid container item style={{ marginRight: "20px" }}>
            <TextField
              fullWidth
              required
              label="Email"
              variant="outlined"
              {...register("email")}
              id="contact"
              InputProps={{
                classes: {
                  root: textFieldClasses.fieldRoot,
                  focused: textFieldClasses.fieldFocused,
                  notchedOutline: textFieldClasses.fieldNotchedOutline,
                },
              }}
              InputLabelProps={{
                classes: {
                  root: textFieldClasses.labelRoot,
                  focused: textFieldClasses.labelFocused,
                },
              }}
            />
          </Grid>
          <Grid container item style={{ marginRight: "20px" }}>
            <TextField
              fullWidth
              required
              multiline
              minRows={4}
              label="Message"
              variant="outlined"
              {...register("message")}
              id="contact"
              InputProps={{
                classes: {
                  root: textFieldClasses.fieldRoot,
                  focused: textFieldClasses.fieldFocused,
                  notchedOutline: textFieldClasses.fieldNotchedOutline,
                },
              }}
              InputLabelProps={{
                classes: {
                  root: textFieldClasses.labelRoot,
                  focused: textFieldClasses.labelFocused,
                },
              }}
            />
          </Grid>

          {/* <Grid container item justifyContent="flex-end">
            <GoogleReCaptchaProvider
              reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY || ""}
            >
              <GoogleReCaptcha onVerify={handleReCaptchaVerify} />
            </GoogleReCaptchaProvider>
          </Grid> */}

          <Grid
            container
            item
            justifyContent="flex-end"
            style={{ marginRight: "20px" }}
          >
            <Button
              variant="outlined"
              className="submitButton"
              type="submit"
              onSubmit={onSubmit}
            >
              SEND
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  };

  return (
    <div className="section contactSection" id="section-contactus">
      <div style={INNER_DIV_WITH_MARGINS}>
        <Grid container className="sectionInnerContentMargin">
          <Grid container item>
            <Typography variant="h2" className="sectionTitle textWhite">
              Contact Us
            </Typography>
          </Grid>
          <Grid container item>
            {renderForm()}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SectionContact;
