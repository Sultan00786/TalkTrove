import React, { useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
      }}
      className=" flex h-full justify-center items-center "
    >
      <div className=" w-[380px] mx-auto my-auto">
        <Paper elevation={3}>
          <div className="  flex flex-col p-7 gap-5">
            <h1 className=" w-full text-center text-3xl text-zinc-500 font-semibold">
              Login
            </h1>

            {isLogin ? (
              <div>
                <form>
                  <div className="flex flex-col gap-3">
                    <TextField
                      id="Username"
                      label="Username *"
                      className=" w-full"
                    />

                    <TextField
                      id="Password"
                      label="Password *"
                      type="password"
                    />

                    <Button
                      variant="contained"
                      size="medium"
                      className=" hover:bg-sky-700"
                      type="submit"
                    >
                      Login
                    </Button>

                    <p className=" text-center font-semibold text-zinc-500">
                      OR
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              <div></div>
            )}

            <Button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "SIGN UP INSTEAD" : "BACK To LOGIN"}
            </Button>
          </div>
        </Paper>
      </div>
    </Container>
  );
}

export default Login;
