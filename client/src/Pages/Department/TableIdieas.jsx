import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";
import formatDate from "../../utils/formatDate";
import LinearProgress from "@mui/material/LinearProgress";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { CreateAxiosNoDispatch } from "../../createInstance";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const user = useSelector((state) => state.auth.login.currentUser);
  const axiosJWT = CreateAxiosNoDispatch(user);
  const accessToken = user?.accessToken;
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    ({ accessToken, idieaId }) =>
      axiosJWT.post(
        "/idieas/publish",
        {
          idieaId: idieaId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["idieasUnpublish"]);
      },
    }
  );

  const { mutate: mutateDelete, isLoading: deleting } = useMutation(
    ({ accessToken, idieaId }) =>
      axiosJWT.post(
        "/idieas/delete",
        {
          idieaId: idieaId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["idieasUnpublish"]);
      },
    }
  );

  const handlePublish = () => {
    mutate({ accessToken: accessToken, idieaId: row.id });
  };

  const handleDelete = () => {
    mutateDelete({ accessToken: accessToken, idieaId: row.id });
  };

  return (
    <React.Fragment sx={{ marginY: "50px" }}>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{`${row.user.firstName} ${row.user.lastName}`}</TableCell>
        <TableCell align="right">{formatDate(row.createdAt)}</TableCell>
        <TableCell align="right">{row.anonymous ? "true" : "false"}</TableCell>
        <TableCell align="right">{row._count.documents}</TableCell>
        <TableCell align="right">
          <Button onClick={handlePublish} color="success">
            Publish
          </Button>
        </TableCell>
        <TableCell align="right">
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Content
              </Typography>
              {row.content}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {(isLoading == true) | (deleting == true) ? (
        <Box
          sx={{
            width: "100%",
            position: "fixed",
            top: "64px",
            left: "0px",
            zIndex: "100",
          }}
        >
          <LinearProgress />
        </Box>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}

export default function CollapsibleTable({ data }) {
  console.log(data);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Content
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Id
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              User name
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Created At
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Anonymous
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Documents
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Publish
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
