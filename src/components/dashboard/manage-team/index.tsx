/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import Moment from "react-moment";
import Table from "@material-ui/core/Table";
import {
  deleteTeammateRequest,
  getTeamMembersRequest,
  setShowSuccessToast,
} from "../../../store/team/actions";
import {
  Grid,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TeamForm from "./team-form/index";

import { IApplicationState } from "../../../store/root-reducer";
import { ITeamMember } from "../../../store/team/types";
import { setShowFailToast } from "./../../../store/team/actions";
import ToastConfigured from "./../../toast/index";

import "react-toastify/dist/ReactToastify.min.css";
import "./style.css";
import { deleteImgRequest } from "../../../store/file-upload/actions";

const ManageTeam = () => {
  const teamState = useSelector((state: IApplicationState) => state.team);
  const fileState = useSelector((state: IApplicationState) => state.file);
  const dispatch = useDispatch();

  const [teammateEdited, setTeammateEdited] = useState<ITeamMember>();

  useEffect(() => {
    if (!teamState.teamMembers || teamState.teamMembers.length === 0) {
      getDataFromAPI();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      (teamState.showFailToast && teamState.showFailToast.length > 0) ||
      (fileState.showFailToast && fileState.showFailToast.length > 0)
    )
      toast.error(teamState.showFailToast);
    dispatch(setShowFailToast(undefined));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamState.showFailToast, fileState.showFailToast]);

  useEffect(() => {
    if (teamState.showSuccessToast && teamState.showSuccessToast.length > 0) {
      toast.success(teamState.showSuccessToast);
      dispatch(setShowSuccessToast(undefined));
    } else if (
      fileState.showSuccessToast &&
      fileState.showSuccessToast.length > 0
    ) {
      toast.success(fileState.showSuccessToast);
      dispatch(setShowSuccessToast(undefined));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamState.showSuccessToast, fileState.showFailToast]);

  const getDataFromAPI = () => {
    dispatch(getTeamMembersRequest());
  };

  const StyledTableHeadCell = withStyles((_) => ({
    head: {
      backgroundColor: "#efefef",
      color: "black",
      fontWeight: 800,
      textTransform: "uppercase",
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  return (
    <div className="teamManagerContainer">
      <ToastConfigured />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableHeadCell align="center">Picture</StyledTableHeadCell>
              <StyledTableHeadCell align="center">
                First Name
              </StyledTableHeadCell>
              <StyledTableHeadCell align="center">
                Last Name
              </StyledTableHeadCell>
              <StyledTableHeadCell align="center">Email</StyledTableHeadCell>
              <StyledTableHeadCell align="center">
                Main Role
              </StyledTableHeadCell>
              <StyledTableHeadCell align="center">
                Secondary Roles
              </StyledTableHeadCell>
              <StyledTableHeadCell align="center">
                Member Since
              </StyledTableHeadCell>
              <StyledTableHeadCell colSpan={2} align="center">
                Actions
              </StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamState.teamMembers.map((teammate) => (
              <TableRow key={teammate._id}>
                <TableCell>
                  <img
                    className="teammatePictureInTable"
                    src={teammate.picture}
                    alt={`${teammate.firstName}'s picture`}
                  />
                </TableCell>
                <TableCell>{teammate.firstName}</TableCell>
                <TableCell>{teammate.lastName}</TableCell>
                <TableCell>{teammate.email}</TableCell>
                <TableCell>{teammate.mainRole}</TableCell>
                <TableCell>
                  <ul>
                    {teammate.secondaryRoles.map((role) => (
                      <li>{role}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <Moment format="YYYY, MMM">{teammate.memberSince}</Moment>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <EditIcon
                      className="iconActions"
                      onClick={() => setTeammateEdited(teammate)}
                    />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      dispatch(deleteImgRequest({ url: teammate.picture }));
                      dispatch(deleteTeammateRequest(teammate));
                    }}
                  >
                    <DeleteIcon className="iconActions" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: "50px" }} />
      <TeamForm
        teammateEdited={teammateEdited}
        setTeammateEdited={setTeammateEdited}
      />
    </div>
  );
};

export default ManageTeam;
