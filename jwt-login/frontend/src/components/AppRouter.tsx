import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import { PrivateRoutes } from "../PrivateRoutes";
import ClientPage from "./CleintPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/client-page" element={<ClientPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
