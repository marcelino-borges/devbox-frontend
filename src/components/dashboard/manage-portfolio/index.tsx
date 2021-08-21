import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IApplicationState } from "../../../store/root-reducer";

import "react-toastify/dist/ReactToastify.min.css";
import "./style.css";
import {
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from "@material-ui/core";
import {
  deletePortfolioRequest,
  getCompletePortfolioRequest,
  setShowFailToast,
  setShowSuccessToast,
} from "../../../store/portfolio/actions";
import LinkIcon from "@material-ui/icons/Link";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PortfolioForm from "./portfolio-form/index";
import { IPortfolioItem } from "../../../store/portfolio/types";
import { toast } from "react-toastify";
import ToastConfigured from "../../toast";
import { deleteImgRequest } from "../../../store/file-upload/actions";

const ManagePortfolio = () => {
  const portfolioState = useSelector(
    (state: IApplicationState) => state.portfolio
  );
  const fileState = useSelector((state: IApplicationState) => state.file);
  const dispatch = useDispatch();

  const [portfolioEdited, setPortfolioEdited] = useState<IPortfolioItem>();

  useEffect(() => {
    if (!portfolioState.portfolio || portfolioState.portfolio.length === 0) {
      getDataFromAPI();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      (portfolioState.showFailToast &&
        portfolioState.showFailToast.length > 0) ||
      (fileState.showFailToast && fileState.showFailToast.length > 0)
    )
      toast.error(portfolioState.showFailToast);
    dispatch(setShowFailToast(undefined));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioState.showFailToast, fileState.showFailToast]);

  useEffect(() => {
    if (
      portfolioState.showSuccessToast &&
      portfolioState.showSuccessToast.length > 0
    ) {
      toast.success(portfolioState.showSuccessToast);
      dispatch(setShowSuccessToast(undefined));
    } else if (
      fileState.showSuccessToast &&
      fileState.showSuccessToast.length > 0
    ) {
      toast.success(fileState.showSuccessToast);
      dispatch(setShowSuccessToast(undefined));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioState.showSuccessToast, fileState.showFailToast]);

  const getDataFromAPI = () => {
    dispatch(getCompletePortfolioRequest());
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
    <div className="portfolioManagerContainer">
      <ToastConfigured />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableHeadCell align="center">
                Highlight Image
              </StyledTableHeadCell>
              <StyledTableHeadCell align="center">Name</StyledTableHeadCell>
              <StyledTableHeadCell align="center">
                Description
              </StyledTableHeadCell>
              <StyledTableHeadCell align="center">
                Store URL
              </StyledTableHeadCell>
              <StyledTableHeadCell align="center">
                Other URLs
              </StyledTableHeadCell>
              <StyledTableHeadCell colSpan={2} align="center">
                Actions
              </StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolioState.portfolio.map((portfolio: IPortfolioItem) => (
              <TableRow key={portfolio._id}>
                <TableCell>
                  {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                  <img
                    className="portfolioPictureInTable"
                    src={portfolio.highlightImg}
                    alt={`${portfolio.name}'s picture`}
                  />
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {portfolio.name}
                </TableCell>
                <TableCell>{portfolio.description}</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <a href={portfolio.storeUrl} target="_blank" rel="noreferrer">
                    <IconButton>
                      <LinkIcon />
                    </IconButton>
                  </a>
                </TableCell>
                <TableCell>
                  {!!portfolio.otherUrls && portfolio.otherUrls.length > 0 ? (
                    portfolio.otherUrls.map((url) => {
                      return (
                        <Chip
                          style={{ margin: "4px" }}
                          label={
                            <a
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                textDecoration: "none",
                                color: "#4589f5",
                              }}
                            >
                              {url}
                            </a>
                          }
                        />
                      );
                    })
                  ) : (
                    <Typography style={{ textAlign: "center" }}>-</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton>
                    <EditIcon
                      onClick={() => setPortfolioEdited(portfolio)}
                      className="iconActions"
                    />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      dispatch(
                        deleteImgRequest({ url: portfolio.highlightImg })
                      );
                      //TODO: Delete imgs too
                      dispatch(deletePortfolioRequest(portfolio));
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
      <PortfolioForm
        portfolioEdited={portfolioEdited}
        setPortfolioEdited={setPortfolioEdited}
      />
    </div>
  );
};

export default ManagePortfolio;
