import { useEffect, useState } from "react";
import { listUsers } from "../api/users";
import type { UserView } from "../api/users";
import "../styles/UsersListPage.css";

export default function UsersListPage() {
  const [users, setUsers] = useState<UserView[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10; // 10 em 10
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const res = await listUsers({ page, limit });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function prev() { setPage((p) => Math.max(1, p - 1)); }
  function next() { setPage((p) => Math.min(totalPages, p + 1)); }

  const formatDateTime = (iso: string) =>
    new Date(iso).toLocaleString("pt-BR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });

  return (
    <div className="userspage">
      <h1 className="userspage__title">Usuários</h1>

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
          <span className="pagination__info">Página {page} de {totalPages}</span>
          <button className="btn" onClick={next} disabled={page >= totalPages}>
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
