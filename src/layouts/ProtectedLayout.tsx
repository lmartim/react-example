import React from "react"
import { Navigate, Link, Outlet } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";

import Logout from "../components/Auth/Logout";

function ProtectedLayout() {
    const user = JSON.parse(localStorage.getItem("auth"))

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <Container>
            <Grid container alignItems="center" justifyContent="center" sx={{ marginTop: 1 }}>
                <Grid item xs={1}>
                    <Link to="/posts">
                        <Typography>Posts</Typography>
                    </Link>
                </Grid>
                <Grid item xs={1}>
                    <Link to="/posts/create">
                        <Typography>Criar Post</Typography>
                    </Link>
                </Grid>
                <Grid item xs={8} sx={{ textAlign: "right" }}>
                    <Logout />
                </Grid>
            </Grid>
            <hr />
            <Grid container alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
                <Grid item xs={8}>
                    <Outlet />
                </Grid>
            </Grid>
        </Container>
    )
}

export default ProtectedLayout