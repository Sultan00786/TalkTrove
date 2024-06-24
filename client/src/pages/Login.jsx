import React, { useRef, useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Avatar, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import toast from "react-hot-toast";

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

  const onSubmitLogin = (event) => {
    event.preventDefault();
  };

  const onSubmitSignUp = (event) => {
    event.preventDefault();
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
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
              <div>
                <form onSubmit={handleSubmit(onSubmitLogin)}>
                  <div className="flex flex-col gap-3">
                    <TextField
                      id="Username"
                      name="Username"
                      label="Username *"
                      className=" w-full"
                      {...register("Username", { required: true })}
                    />
                    {errors.Username && (
                      <p className=" text-red-700 text-xs -mt-2 text-end">
                        Please enter UserName
                      </p>
                    )}

                    <TextField
                      id="Password"
                      name="Password"
                      label="Password *"
                      type="password"
                      {...register("Password", { required: true })}
                    />
                    {errors.Password && (
                      <p className=" text-red-700 text-xs -mt-2 text-end">
                        Please enter Password
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
                      id="Name"
                      name="Name"
                      label="Name *"
                      {...register("Name", { required: true })}
                    />
                    {errors.Name && (
                      <p className=" text-red-700 text-xs -mt-2 text-end">
                        Please enter Name
                      </p>
                    )}

                    <TextField
                      id="Bio"
                      name="Bio"
                      label="Bio *"
                      {...register("Bio", { required: true })}
                    />
                    {errors.Bio && (
                      <p className=" text-red-700 text-xs -mt-2 text-end">
                        Please enter Bio
                      </p>
                    )}

                    <TextField
                      id="Username"
                      name="Username"
                      label="Username *"
                      {...register("Username", { required: true })}
                    />
                    {errors.Username && (
                      <p className=" text-red-700 text-xs -mt-2 text-end">
                        Please enter UserName
                      </p>
                    )}

                    <TextField
                      id="Password"
                      name="Password"
                      label="Password *"
                      type="password"
                      {...register("Password", { required: true })}
                    />
                    {errors.Password && (
                      <p className=" text-red-700 text-xs -mt-2 text-end">
                        Please enter Password
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
