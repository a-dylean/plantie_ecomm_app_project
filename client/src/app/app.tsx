import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { theme } from "../components/theme";
import { ProductsContainer } from "../features/products/productsContainerPage";
import { RegistrationForm } from "../features/auth/registrationPage";
import { LoginForm } from "../features/auth/loginPage";
import { ProfilePage } from "../features/users/profilePage";
import { ProductPage } from "../features/products/productPage";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="products/all" element={<ProductsContainer/>}/>
            <Route path="products/:productId" element={<ProductPage/>}/>
            <Route path="auth/register" element={<RegistrationForm/>}/>
            <Route path="auth/login" element={<LoginForm/>}/>
            <Route path="me" element={<ProfilePage/>}/>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};
