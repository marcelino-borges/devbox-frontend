import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { useForm } from "react-hook-form";

import Table from "@material-ui/core/Table";
import {
  Grid,
  IconButton,
  makeStyles,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  withStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { IApplicationState } from "../../../../store/root-reducer";
import LightTextfield from "../../../shared/textfield-light";

import "react-toastify/dist/ReactToastify.min.css";
import "./style.css";

const PortfolioForm = () => {
  const teamState = useSelector((state: IApplicationState) => state.team);
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    const email = data.email;
    const password = data.password;

    reset();
  };

  useEffect(() => {
    if (!teamState.teamMembers || teamState.teamMembers.length === 0) {
      getDataFromAPI();
    }
  }, []);

  const getDataFromAPI = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item md={2}>
          <LightTextfield
            required
            label="First Name"
            register={register("firstName")}
          />
        </Grid>
        <Grid item md={2}>
          <LightTextfield
            required
            label="Last Name"
            register={register("lastName")}
          />
        </Grid>
        <Grid item md={2}>
          <LightTextfield
            required
            label="Main Role"
            register={register("mainRole")}
          />
        </Grid>
        <Grid item md={2}>
          <LightTextfield
            required
            label="Secondary Roles"
            register={register("secondaryRoles")}
          />
        </Grid>
        <Grid item md={2}>
          <LightTextfield
            required
            shrinkLabel
            label="Member Since"
            register={register("firstName")}
            type="date"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default PortfolioForm;
