"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";

const pages = [
  { label: "Meet the Developers", href: "/developers" },
  { label: "Home", href: "/" },
];

function Header() {
  return (
    <AppBar position="fixed" sx={{ background: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" passHref>
            <Typography
              variant="h5"
              noWrap
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "Verdana",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              POLLEN
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {pages.map((page) => (
              <Link href={page.href} passHref key={page.label}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
