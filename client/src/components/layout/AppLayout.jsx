import React, { Suspense } from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import Loader from "./Loader";

const AppLayout = () => (WrappedCommponent) => {
  return (props) => {
    return (
      <div>
        <Title title="Chat App" />
        <Header />

        <Suspense fallback={<Loader />}>
          <Grid container height={"calc(100vh - 4rem)"}>
            <Grid
              item
              sm={4}
              md={3}
              lg={3}
              sx={{
                display: { xs: "none", sm: "block" },
              }}
              height={"100%"}
            >
              First
            </Grid>

            <Grid item xs={12} sm={8} lg={6} md={5} height={"100%"}>
              <WrappedCommponent {...props} />
            </Grid>

            <Grid
              item
              md={4}
              lg={3}
              sx={{
                display: { xs: "none", md: "block" },
              }}
              height={"100%"}
              className=" p-8 bg-slate-950 bg-opacity-95 text-white"
            >
              Third
            </Grid>
          </Grid>
        </Suspense>
      </div>
    );
  };
};

export default AppLayout;
