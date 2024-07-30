import React, { useRef, useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Avatar, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import toast from "react-hot-toast";
import { newUser } from "../operation/apiController/userApi";

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

  const handlerFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast("Please Upload image", {
        icon: "👏",
      });
    } else {
      const reader = new FileReader();
      // console.log(reader);
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFilePath(reader.result);
      };
    }
  };

  const onSubmitLogin = (e) => {
    const data = getValues();
    console.log(data);
    e.preventDefault();
  };

  const onSubmitSignUp = (e) => {
    let data = getValues();
    data = { ...data, avatar: filePath };
    const response = newUser(data);
    e.preventDefault();
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
      }}
      className=" flex h-full justify-center items-center "
    >
      <div className=" w-[380px] rounded-md mx-auto my-auto">
        <Paper elevation={2}>
          <div className=" flex flex-col rounded-md p-7 gap-5">
            <h1 className=" w-full text-center text-3xl text-zinc-500 font-semibold">
              {isLogin ? "Login" : "Sign Up"}
            </h1>

            {isLogin ? (
              <div className="">
                <form onSubmit={handleSubmit(onSubmitLogin)}>
                  <div className="flex flex-col gap-3">
                    <TextField
                      id="username"
                      name="username"
                      label="username *"
                      className=" w-full"
                      {...register("username", { required: true })}
                    />
                    {errors.username && (
                      <p className=" text-red-700 text-xs -mt-2 text-end">
                        Please enter userName
                      </p>
                    )}

                    <TextField
                      id="password"
                      name="password"
                      label="password *"
                      type="password"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <p className=" text-red-700 text-xs -mt-2 text-end">
                        Please enter password
                      </p>
                    )}

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
                <form onSubmit={handleSubmit(onSubmitSignUp)}>
                  <div className="flex flex-col gap-3">
                    <div className=" relative flex flex-col items-center">
                      <Paper
                        elevation={4}
                        sx={{
                          borderRadius: 100,
                        }}
                      >
                        <Avatar
                          src={filePath ? filePath : ""}
                          sx={{
                            width: 120,
                            height: 120,
                          }}
                        />
                      </Paper>
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

                    <TextField
                      id="name"
                      name="name"
                      label="name *"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <p className=" text-red-700 text-xs -mt-2 text-end">
                        Please enter Name
                      </p>
                    )}

                    <TextField
                      id="bio"
                      name="bio"
                      label="bio *"
                      {...register("bio", { required: true })}
                    />
                    {errors.bio && (
                      <p className=" text-red-700 text-xs -mt-2 text-end">
                        Please enter bio
                      </p>
                    )}

                    <TextField
                      id="username"
                      name="username"
                      label="username *"
                      {...register("username", { required: true })}
                    />
                    {errors.username && (
                      <p className=" text-red-700 text-xs -mt-2 text-end">
                        Please enter userName
                      </p>
                    )}

                    <TextField
                      id="password"
                      name="password"
                      label="password *"
                      type="password"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <p className=" text-red-700 text-xs -mt-2 text-end">
                        Please enter password
                      </p>
                    )}

                    <Button
                      variant="contained"
                      size="medium"
                      className=" hover:bg-sky-700"
                      type="submit"
                    >
                      SIGN UP
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
