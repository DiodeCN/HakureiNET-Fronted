import { Helmet } from "react-helmet-async";
// @mui
import { Grid, Button, Container, Stack, Typography, Box } from "@mui/material";
// components
import Iconify from "../components/iconify";
import {
  BlogPostCard,
  BlogPostsSort,
  BlogPostsSearch
} from "../sections/@dashboard/blog";
// mock
import POSTS from "../_mock/blog";

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" }
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>次元连接|关于网站</title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h2" gutterBottom>
            关于网站
          </Typography>
        </Stack>
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.72)",
            backdropFilter: "blur(10px)",
            p: 3,
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center"
          }}
        >
          <Typography variant="h2" gutterBottom align="left">
            次元连接|HakureiNET! V1.0.1 ElmCose
          </Typography>
          <Typography variant="h4" gutterBottom align="left">
            显而易见的是，我的<a href="https://elmcose.cn/">博客</a>
            已经通过了管局备案，在这里你可以看到有关我给网站留的最新信息。
            <br />
          </Typography>
        </Box>
      </Container>
    </>
  );
}
