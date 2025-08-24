// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function UsersPlaceholder() {
  return <div style={{ padding: 24 }}>Área logada (lista de usuários vai aqui).</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />         {/* página inicial */}
        <Route path="/register" element={<RegisterPage />} />  {/* <- aqui */}
        <Route path="/users" element={<UsersPlaceholder />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
