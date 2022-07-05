import React from "react";
import {
  CircularProgress,
  Container,
  Alert,
  Typography,
  Box,
  Button,
  TextField,
  Snackbar,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup.string().required().email(),
  first_name: yup.string().required().min(5),
  last_name: yup.string().required().min(5),
});

export default function Form() {
  const { id } = useParams();
  let navigate = useNavigate();

  let udata = localStorage
    .getItem("usersData")
    ?.split(",  ")
    .map((u) => JSON.parse(u));
  let tdata = udata.filter((ud) => {
    return ud.id == id;
  });
  const l_id = Array.isArray(udata) ? udata[udata.length - 1].id : 0;

  const formik = useFormik({
    initialValues: {
      email: tdata[0] ? tdata[0].email : "",
      first_name: tdata[0] ? tdata[0].first_name : "",
      last_name: tdata[0] ? tdata[0].last_name : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (id) {
        udata = udata.map((u) => (u.id == id ? { ...tdata[0], ...values } : u));
      } else {
        udata.push({ id: l_id + 1, ...values });
      }
      localStorage.setItem(
        "usersData",
        udata.map((d) => JSON.stringify(d)).join(",  ")
      );
      navigate("/", { replace: true });
    },
  });

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <Typography component="h1" variant="h5">
          {id ? "Update" : "Add"} Details
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            InputProps={{ sx: { color: "#fff" } }}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoFocus
          />
          <TextField
            InputProps={{ sx: { color: "#fff" } }}
            margin="normal"
            required
            fullWidth
            id="first_name"
            label="First Name"
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={
              formik.touched.first_name && Boolean(formik.errors.first_name)
            }
            helperText={formik.touched.first_name && formik.errors.first_name}
            autoComplete="first_name"
          />
          <TextField
            InputProps={{ sx: { color: "#fff" } }}
            margin="normal"
            required
            fullWidth
            id="last_name"
            label="Last Name"
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
            autoComplete="last_name"
          />
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "max-content" }}
          >
            {id ? "Update" : "Add"}
          </Button>
          <Link to="/">
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="outlined"
              color="info"
              sx={{ mt: 3, ml: 2, mb: 2, width: "max-content" }}
            >
              Back
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
