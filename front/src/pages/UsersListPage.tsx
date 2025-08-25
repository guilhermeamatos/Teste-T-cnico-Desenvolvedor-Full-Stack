import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listUsers } from "../api/users";
import type { UserView } from "../api/users";
import Modal from "../components/Modal";
import RegisterForm from "../components/RegisterForm";
import "../styles/UsersListPage.css";
import "../styles/modal.css";

export default function UsersListPage() {
  const [users, setUsers] = useState<UserView[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const debouncedNome = useDebounce(nome, 300);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const res = await listUsers({
        page,
        limit,
        nome: debouncedNome?.trim() ? debouncedNome.trim() : undefined,
      });
      setUsers(res.data);
      setTotalPages(res.totalPages);
    } catch (e: any) {
      if (e?.response?.status === 401) {
        setErr("Não autorizado. Faça login para acessar a lista.");
      } else {
        setErr("Falha ao carregar usuários. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [page, debouncedNome]);

  function prev() {
    setPage((p) => Math.max(1, p - 1));
  }
  function next() {
    setPage((p) => Math.min(totalPages, p + 1));
  }

  function onChangeNome(v: string) {
    setNome(v);
    setPage(1);
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const formatDateTime = (iso: string) =>
    new Date(iso).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="userspage">
      <div
        className="userspage__header"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <h1 className="userspage__title">Usuários</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn" type="button" onClick={() => setIsOpen(true)}>
            Novo usuário
          </button>
          <button className="btn btn--muted" type="button" onClick={logout}>
            Sair
          </button>
        </div>
      </div>

      <div className="userspage__filters">
        <input
          className="input"
          type="text"
          placeholder="Pesquisar por nome"
          value={nome}
          onChange={(e) => onChangeNome(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") load();
          }}
        />
        <button
          className="btn btn--muted"
          type="button"
          onClick={() => onChangeNome("")}
          disabled={!nome}
        >
          Limpar
        </button>
      </div>

      <div className="userspage__card">
        {loading ? (
          <p>Carregando...</p>
        ) : err ? (
          <p className="form__error">{err}</p>
        ) : users.length === 0 ? (
          <p>Nenhum usuário encontrado.</p>
        ) : (
          <div className="table__wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Data de criação</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.nome}</td>
                    <td>{u.email}</td>
                    <td>{formatDateTime(u.dataCriacao)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="pagination">
          <button className="btn" onClick={prev} disabled={page <= 1}>
            Anterior
          </button>
          <span className="pagination__info">
            Página {page} de {totalPages}
          </span>
          <button className="btn" onClick={next} disabled={page >= totalPages}>
            Próxima
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Cadastrar usuário">
        <RegisterForm
          onSuccess={() => {
            setIsOpen(false);
            load();
          }}
        />
      </Modal>
    </div>
  );
}

function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
