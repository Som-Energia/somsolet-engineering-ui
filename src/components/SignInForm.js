import { useFormik } from "formik";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Button, Checkbox, FormControlLabel } from "@mui/material";

const StyledCard = styled.div`
  background-color: white;
  width: 50%;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacings.small3};
  > form > div,
  label,
  button {
    margin-bottom: ${({ theme }) => theme.spacings.small3};
  }
`;

const StyledHeading = styled.h3`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacings.small3};
`;

const SignInForm = ({ handleSignIn = () => {} }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      remember: false,
    },
    async onSubmit({ username, password, remember }, { setSubmitting }) {
      await handleSignIn({ username, password, remember });
    },
  });

  const {
    handleSubmit,
    isSubmitting,
    errors,
    touched,
    handleBlur,
    handleChange,
    values,
  } = formik;

  return (
    <StyledCard>
      <StyledHeading>Iniciar sesión</StyledHeading>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          autoFocus
          id="username"
          label="Usuari"
          name="username"
          variant="outlined"
          margin="normal"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          error={errors.username && touched.username}
          helperText={touched.username && errors.username}
        />
        <TextField
          required
          fullWidth
          id="password"
          type="password"
          label="Password"
          name="password"
          variant="outlined"
          margin="normal"
          autoComplete="current-password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          error={errors.password && touched.password}
          helperText={touched.password && errors.password}
        />
        <FormControlLabel
          control={
            <Checkbox
              value="remember"
              color="primary"
              onChange={handleChange}
            />
          }
          label="Recorda'm"
        />
        <Button
          type="submit"
          fullWidth
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          Entrar
        </Button>
      </form>
    </StyledCard>
  );
};

export default SignInForm;
