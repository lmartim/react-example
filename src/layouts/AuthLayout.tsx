import React from "react"
import { Navigate, Link, Outlet } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";

function ProtectedLayout() {
    const user = JSON.parse(localStorage.getItem("auth"))

    if (user) {
        return <Navigate to="/posts" />;
    }

    return (
        <Container>
            <Grid container alignItems="center" justifyContent="center" sx={{ marginTop: 1 }}>
                <Grid item xs={1}>
                    <Link to="/">
                        <Typography>Login</Typography>
                    </Link>
                </Grid>
                <Grid item xs={1}>
                    <Link to="/register">
                        <Typography>Registrar</Typography>
                    </Link>
                </Grid>
            </Grid>
            <hr />
            <Grid container alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
                <Grid item xs={3}>
                    <Outlet />
                </Grid>
            </Grid>
        </Container>
    )
}

export default ProtectedLayout