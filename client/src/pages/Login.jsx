import React, { useRef, useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Avatar, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [filePath, setFilePath] = useState(null);
  const fileInput = useRef();

  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlerFileChange = (data) => {

  }

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
              {isLogin ? "Login" : "Sign Up"}
            </h1>

            {isLogin ? (
              <div>
                <form>
                  <div className="flex flex-col gap-3">
                    <TextField
                      id="Username"
                      name="Username"
                      label="Username *"
                      className=" w-full"
                    />

                    <TextField
                      id="Password"
                      name="Password"
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
              <div>
                <form>
                  <div className="flex flex-col gap-3">
                    <div className=" relative flex flex-col items-center">
                      <Avatar
                        src={filePath}
                        sx={{
                          width: 120,
                          height: 120,
                        }}
                      />
                      <CameraAltIcon
                        fontSize="large"
                        className=" absolute right-[100px] bottom-0 bg-black text-white rounded-full p-[5px] opacity-30 hover:opacity-60 cursor-pointer"
                        onClick={() => {
                          if (fileInput.current) fileInput.current.click();
                        }}
                      />
                      <input
                        type="file"
                        ref={fileInput}
                        id="DisplayPic"
                        name="DisplayPic"
                        className="hidden"
                        accept="image/*"
                        onChange={handlerFileChange}
                      />
                    </div>

                    <TextField id="Name" name="Name" label="Name *" />

                    <TextField id="Bio" name="Bio" label="Bio *" />

                    <TextField
                      id="Username"
                      name="Username"
                      label="Username *"
                    />

                    <TextField
                      id="Password"
                      name="Password"
                      label="Password *"
                      type="password"
                    />

                    <Button
                      variant="contained"
                      size="medium"
                      className=" hover:bg-sky-700"
                      type="submit"
                    >
                      {isLogin ? "LOGIN" : "SIGN UP"}
                    </Button>

                    <p className=" text-center font-semibold text-zinc-500">
                      OR
                    </p>
                  </div>
                </form>
              </div>
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
