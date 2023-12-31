import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../Layout/MainLayout";
import { Home } from "../Pages/Home";
import { NicPage } from "../Pages/NicPage";
import { MobilePage } from "../Pages/MobilePage";
import { LoginPage } from "../Pages/LoginPage";
import { SignUp } from "../Pages/SignUp";
import { Profile } from "../Pages/Profile";
import { ManageUsers } from "../Pages/ManageUsers";
import { Test } from "../Pages/Test";
import { Analytics } from "../Pages/Analytics";
import { ForgotPassword } from "../Pages/ForgotPassword";
import { ChangePassword } from "../Pages/ChangePassword";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="nic" element={<NicPage />} />
          <Route path="mobile" element={<MobilePage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="manageUsers" element={<ManageUsers />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="forgotPassword/:username" element={<ForgotPassword />} />
          <Route path="changePassword/:id" element={<ChangePassword />} />

          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="test" element={<Test />} />
        </Route>

        {/* <Route path='/'>
            </Route> */}
      </Routes>
    </BrowserRouter>
  );
};
