import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/users";
import "../styles/RegisterPage.css";

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const navigate = useNavigate();

  const faltaCampo =
    !nome.trim() || !email.trim() || !senha.trim() || !repetirSenha.trim();
  const senhasDiferentes =
    senha !== "" && repetirSenha !== "" && senha !== repetirSenha;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(null);

    if (faltaCampo) {
      setErr("Preencha todos os campos obrigatórios.");
      return;
    }
    if (senhasDiferentes) {
      setErr("As senhas não conferem.");
      return;
    }

    setLoading(true);
    try {
      const user = await createUser({ nome, email, senha });
      setOk(`Usuário ${user.nome} cadastrado!`);
      setNome("");
      setEmail("");
      setSenha("");
      setRepetirSenha("");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (e: any) {
      if (e?.response?.status === 409) {
        setErr("Email já cadastrado.");
      } else if (e?.response?.status === 400) {
        setErr("Dados inválidos. Verifique os campos.");
      } else if (e?.response?.status === 401) {
        setErr("Não autorizado. Faça login para cadastrar.");
      } else {
        setErr("Não foi possível cadastrar. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  const disableSubmit = loading || faltaCampo || senhasDiferentes;

  return (
    <div className="registerpage">
      <h1 className="registerpage__title">Cadastrar usuário</h1>

      <form onSubmit={onSubmit} className="registerpage__form" noValidate>
        <div className="field">
          <label className="field__label">
            Nome <span className="required">*</span>
          </label>
          <input
            className="field__input"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            autoComplete="name"
            required
          />
        </div>

        <div className="field">
          <label className="field__label">
            Email <span className="required">*</span>
          </label>
          <input
            className="field__input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="field">
          <label className="field__label">
            Senha <span className="required">*</span>
          </label>
          <input
            className="field__input"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="new-password"
            required
            minLength={6}
          />
        </div>

        <div className="field">
          <label className="field__label">
            Repetir senha <span className="required">*</span>
          </label>
          <input
            className="field__input"
            type="password"
            value={repetirSenha}
            onChange={(e) => setRepetirSenha(e.target.value)}
            autoComplete="new-password"
            required
            minLength={6}
          />
          {senhasDiferentes && (
            <small className="field__hint">As senhas precisam ser iguais.</small>
          )}
        </div>

        {err && <p className="form__error">{err}</p>}
        {ok && <p className="form__ok">{ok}</p>}

        <button className="btn" disabled={disableSubmit}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
