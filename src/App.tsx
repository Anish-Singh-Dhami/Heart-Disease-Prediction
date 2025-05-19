import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoutes } from "./auth/ProtectedRoutes";
import { GuestRoute } from "./auth/GuestRoute";
import { PredictionPage } from "./forms/PredicitonPage";
import { SignupPage } from "./pages/SignupPage";
import AllDoctorsPage from "./pages/AllDoctorsPage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <Routes>
      <Route path="/patient" element={<GuestRoute />}>
        <Route
          path="login"
          element={
            <Layout>
              <LoginPage />
            </Layout>
          }
        />
        <Route
          path="signup"
          element={
            <Layout>
              <SignupPage />
            </Layout>
          }
        />
      </Route>
      <Route path="/patient" element={<ProtectedRoutes />}>
        <Route
          path="prediction/form"
          element={
            <Layout>
              <PredictionPage />
            </Layout>
          }
        />
        <Route
          path="search/doctors"
          element={
            <Layout>
              <AllDoctorsPage />
            </Layout>
          }
        />
        <Route
          path="chat"
          element={
            <Layout>
              <ChatPage />
            </Layout>
          }
        />
      </Route>

      <Route path="/doctor" element={<GuestRoute />}>
        <Route
          path="login"
          element={
            <Layout>
              <LoginPage />
            </Layout>
          }
        />
        <Route
          path="signup"
          element={
            <Layout>
              <SignupPage />
            </Layout>
          }
        />
      </Route>

      <Route path="/doctor" element={<ProtectedRoutes />}>
        <Route path="chat" element={<Layout>Chat with patients...</Layout>} />
      </Route>

      <Route path="*" element={<Navigate to="/patient/login" />} />
    </Routes>
  );
}

export default App;
