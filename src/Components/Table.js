import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Box,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import DDialog from "./DDialog";

export default function TTable() {
  const [e_data, setEData] = useState([]);
  const [target_del, setDTarget] = useState(-1);
  const [modal_flag, setModalFlag] = useState(false);
  const [loader, setLoader] = useState(false);
  let udata = localStorage.getItem("usersData");

  const handleModel = (action) => {
    if (action === true) {
      deleteUser(target_del);
    }
    setModalFlag(false);
  };

  const deleteUser = (tid) => {
    target_del !== -1 &&
      (async function () {
        const { status } = await axios.delete(
          `https://reqres.in/api/users/${tid}`
        );
        if (status === 204) {
          udata = e_data
            .filter((val, id) => val.id !== tid)
            .map((d) => JSON.stringify(d))
            .join(",  ");
          localStorage.setItem("usersData", udata);
          setEData(udata.split(",  ").map((u) => JSON.parse(u)));
          setDTarget(-1);
        } else {
          console.log("not deleted");
        }
      })();
  };

  const getAPIData = () => {
    (async function () {
      setLoader(true);

      let r_data = await axios.get("https://reqres.in/api/users");
      setEData(r_data.data.data);
      localStorage.setItem(
        "usersData",
        r_data.data.data.map((d) => JSON.stringify(d)).join(",  ")
      );

      setLoader(false);
    })();
  };

  useEffect(() => {
    if (udata) {
      setEData(udata.split(",  ").map((u) => JSON.parse(u)));
    } else {
      getAPIData();
    }
  }, []);

  if (loader) {
    return (
      <Container
        sx={{
          marginBlock: "40px",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        component="main"
        maxWidth="lg"
      >
        <CircularProgress />
      </Container>
    );
  }
  return (
    <Container sx={{ marginBlock: "40px" }} component="main" maxWidth="lg">
      <DDialog open={modal_flag} handleModel={handleModel} />
      <Box sx={{ display: "flex", columnGap: "20px" }}>
        <Button
          sx={{ marginLeft: "10px" }}
          color="warning"
          sx={{ marginBlock: "20px", display: "block", marginLeft: "auto" }}
          variant="contained"
          onClick={() => {
            localStorage.removeItem("usersData");
            window.location.reload();
          }}
        >
          Reset
        </Button>
        <Link to="/add">
          <Button
            sx={{ marginLeft: "10px" }}
            color="info"
            sx={{ marginBlock: "20px", display: "block", marginLeft: "auto" }}
            variant="contained"
          >
            Add
          </Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Avatar</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {e_data.map((row, id) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">
                  {!row.avatar ? (
                    <Avatar
                      style={{
                        marginInline: "auto",
                        minWidth: "7vw",
                        minHeight: "7vw",
                        boxShadow: "0px 0px 1px 3px #fff, 0px 0px 1px 5px #147",
                        borderRadius: "50%",
                        height: "7vw",
                        width: "7vw",
                      }}
                    />
                  ) : (
                    <img
                      alt="avatar"
                      style={{
                        minWidth: "7vw",
                        minHeight: "7vw",
                        boxShadow: "0px 0px 1px 3px #fff, 0px 0px 1px 5px #147",
                        borderRadius: "50%",
                        height: "7vw",
                        width: "7vw",
                      }}
                      src={row.avatar}
                    />
                  )}
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.first_name}</TableCell>
                <TableCell align="center">{row.last_name}</TableCell>
                <TableCell align="center">
                  <Link to={"/view/" + row.id}>
                    <Button>View</Button>
                  </Link>
                  <Button
                    sx={{ marginLeft: "10px" }}
                    color="error"
                    onClick={() => {
                      setModalFlag(true);
                      setDTarget(row.id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
