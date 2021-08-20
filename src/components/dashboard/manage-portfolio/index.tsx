import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IApplicationState } from "../../../store/root-reducer";

import "react-toastify/dist/ReactToastify.min.css";
import "./style.css";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";
import { getCompletePortfolioRequest } from "../../../store/portfolio/actions";
import LinkIcon from "@material-ui/icons/Link";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const ManagePortfolio = () => {
  const portfolioState = useSelector(
    (state: IApplicationState) => state.portfolio
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!portfolioState.portfolio || portfolioState.portfolio.length === 0) {
      getDataFromAPI();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableHeadCell align="center">Picture</StyledTableHeadCell>
              <StyledTableHeadCell align="center">Name</StyledTableHeadCell>
              <StyledTableHeadCell align="center">
                Description
              </StyledTableHeadCell>
              <StyledTableHeadCell align="center">
                Highlight Image
              </StyledTableHeadCell>
              <StyledTableHeadCell align="center">
                Other Images
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
            {portfolioState.portfolio.map((portfolio) => (
              <TableRow key={portfolio.id}>
                <TableCell>
                  {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                  <img
                    className="portfolioPictureInTable"
                    src={portfolio.highlightImg}
                    alt={`${portfolio.name}'s picture`}
                  />
                </TableCell>
                <TableCell>{portfolio.name}</TableCell>
                <TableCell>{portfolio.description}</TableCell>
                <TableCell>
                  {!!portfolio.imgs && portfolio.imgs.length > 0 ? (
                    <ul>
                      {portfolio.imgs.map((img) => {
                        if (img.length > 0)
                          return (
                            <li>
                              {/* eslint-disable-next-line jsx-a11y/alt-text */}
                              <img
                                className="portfolioPictureInTable"
                                src={img}
                              />
                            </li>
                          );
                        else return "-";
                      })}
                    </ul>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  <a href={portfolio.storeUrl} target="_blank" rel="noreferrer">
                    <IconButton>
                      <LinkIcon />
                    </IconButton>
                  </a>
                </TableCell>
                <TableCell>
                  <Table>
                    <TableBody>
                      {portfolio.otherUrls.map((url) => {
                        return (
                          <TableRow>
                            <TableCell>{url.name}</TableCell>
                            <TableCell>
                              <a
                                href={url.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <IconButton>
                                  <LinkIcon />
                                </IconButton>
                              </a>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <EditIcon className="iconActions" />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <DeleteIcon className="iconActions" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManagePortfolio;
