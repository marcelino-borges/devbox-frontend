import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs, { init } from "emailjs-com";

import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import "@fontsource/roboto";

import { INNER_DIV_WITH_MARGINS } from "../../Utils/patterns";
import ToastConfigured from "../toast";
import { DefaultLogTitles, LogType } from "./../../store/logs/types";

import "./style.css";

const SectionContact = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [recaptchaValidation, setRecatchaValidation] = useState<
    string | undefined
  >();
  const [canSendEmail, setCanSendEmail] = useState<boolean>(false);

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
    toast.success("Email successfully sent!");
  };

  const toastifyFail = () => {
    toast.error(
      <>
        Something went wrong sending this email... You can try again via
        LinkedIn{" "}
        <a
          href="https://www.linkedin.com/company/devbox-brasil/"
          target="_blank"
          rel="noreferrer"
        >
          CLICKING HERE
        </a>
      </>
    );
  };

  const onSubmit = (data: any) => {
    if (!recaptchaValidation || recaptchaValidation.length <= 0) return;

    const templateParams = {
      name: data.name,
      email: data.email,
      message: data.message,
      "g-recaptcha-response": recaptchaValidation,
    };

    const sendEmail = async () => {
      if (
        process.env.REACT_APP_EMAIL_SERVID &&
        process.env.REACT_APP_EMAIL_TEMPID &&
        process.env.REACT_APP_EMAIL_USER
      ) {
        await emailjs
          .send(
            process.env.REACT_APP_EMAIL_SERVID,
            process.env.REACT_APP_EMAIL_TEMPID,
            templateParams,
            process.env.REACT_APP_EMAIL_USER
          )
          .then((res) => {
            reset();
            toastifySuccess();
            setRecatchaValidation(undefined);
          })
          .catch((e) => {
            toastifyFail();
            dispatch(
              createLogRequest({
                title: DefaultLogTitles.EMAIL_ERROR,
                content: `Error sending an email from devbox.eng.br home (contact form). Email fields: { name: ${templateParams.name}, email: ${templateParams.email}, message: ${templateParams.message}`,
                error: e.message,
                type: LogType.ERROR,
              })
            );
          });
      }
    };
    sendEmail();
  };

  const handleReCaptchaSuccess = useCallback(
    (token: any) => setRecatchaValidation(token),
    []
  );

  useEffect(() => {
    if (
      process.env.REACT_APP_EMAIL_USER &&
      process.env.REACT_APP_EMAIL_USER.length > 0
    )
      init(process.env.REACT_APP_EMAIL_USER);
  }, []);

  useEffect(() => {
    setCanSendEmail(!!recaptchaValidation && recaptchaValidation.length > 0);
  }, [recaptchaValidation, setRecatchaValidation]);

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

          <Grid
            container
            item
            justifyContent="flex-end"
            style={{ paddingRight: "30px" }}
          >
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_KEY || ""}
              onChange={handleReCaptchaSuccess}
            />
          </Grid>

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
              disabled={!canSendEmail}
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
      <ToastConfigured />
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
function createLogRequest(arg0: {}): any {
  throw new Error("Function not implemented.");
}
