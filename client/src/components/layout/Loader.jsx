import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

function Loader() {
  return (
    <div className="max-h-[100vh] w-full flex flex-col gap-3 fixed">
      <Stack>
        <Skeleton variant="rounded" animation="wave" height={40} />
      </Stack>
      <Grid container height={"100vh"} spacing={2} display="fix">
        <Grid
          item
          sm={4}
          md={3}
          lg={3}
          sx={{
            display: { xs: "none", sm: "block" },
          }}
        >
          <Stack spacing={1}>
            <Skeleton variant="rounded" animation="wave" height={"100vh"} />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={8} lg={6} md={5} height={"100vh"}>
          <Stack spacing={2}>
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index}>
                <div>
                  <Skeleton
                    height={70}
                    variant="rounded"
                    animation="wave"
                  ></Skeleton>
                </div>
              </div>
            ))}
          </Stack>
        </Grid>

        <Grid
          item
          md={4}
          lg={3}
          sx={{
            display: { xs: "none", md: "block" },
          }}
          height={"100%"}
        >
          <Skeleton variant="rounded" animation="wave" height={"100vh"} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Loader;
