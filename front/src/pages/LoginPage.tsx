import { useState } from "react";
import { loginApi } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css"; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const navigate = useNavigate();
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const { token } = await loginApi({ email, senha });
      localStorage.setItem("token", token);
      navigate("/users");
    } catch (e: any) {
      if (e?.response) {
        if (e.response.status === 401) {
          setErr("Credenciais erradas.");
        } else {
          setErr("Não foi possível conectar. Tente novamente.");
        }
      } else {
        setErr("Não foi possível conectar. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="loginpage">
      <h1 className="loginpage__title">Entrar</h1>

      <form onSubmit={onSubmit} className="loginpage__form">
        <div className="field">
          <label className="field__label">Email</label>
          <input
            className="field__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="field">
          <label className="field__label">Senha</label>
          <input
            className="field__input"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        {err && <p className="form__error">{err}</p>}

        <button className="btn" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <p className="loginpage__hint">
          Não tem uma conta? <a href="/register">Cadastre-se</a>
        </p>
      </form>
    </div>
  );
}
