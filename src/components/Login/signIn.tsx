import { makeStyles } from "@mui/styles";
import { Typography } from "../DesignSystem/Typography";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Button } from "../DesignSystem/Button";
import { TextField } from "@mui/material";
import { signIn } from "../../api/auth";
import { useHistory } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const useStyles = makeStyles({
  textDefault: {
    color: "#1e1e1e",
    marginBottom: "10px",
  },
  mainDiv: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "relative",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  signInDiv: {
    height: "500px",
    width: "700px",
    borderRadius: "4px",
    border: "1px solid #999",
    padding: "20px",
    backgroundColor: "#e7e7e7",
    "@media (max-width:600px)": {
      width: "fit-content",
    },
  },
  text: {
    color: "#e7e7e7",
    border: "1ps solid #e7e7e7",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  button: {
    borderRadius: "4px",
    fontWeight: 600,
    color: "#0f0f0f",
    backgroundColor: "#fda560",
    "&:hover": {
      backgroundColor: "#fd8121",
    },
    height: "32px",
    textTransform: "capitalize",
  },
});

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is not valid.")
    .required("Email is required."),
  password: Yup.string().required("Password is required."),
});

export const SignIn: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { login } = useUser();

  function onSubmitForm(email: string, password: string) {
    signIn(email, password)
      .then((response) => {
        login({ name: response.data.name, email: response.data.email });
        history.push("/products");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className={classes.mainDiv}>
      <div className={classes.signInDiv}>
        <Typography type="headingH1" className={classes.textDefault}>
          Login
        </Typography>
        <Typography className={classes.textDefault}>
          Login to access your account
        </Typography>
        <div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validateOnChange
            validationSchema={SignInSchema}
            onSubmit={(values) => onSubmitForm(values.email, values.password)}
          >
            {(formik) => (
              <Form className={classes.form}>
                <div>
                  <TextField
                    fullWidth
                    variant="outlined"
                    className={classes.text}
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </div>
                <div>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </div>
                <button type="submit" className={classes.button}>
                  SignIn
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
