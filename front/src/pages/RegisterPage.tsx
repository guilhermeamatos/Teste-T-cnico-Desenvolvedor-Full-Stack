import RegisterForm from "../components/RegisterForm";
import "../styles/RegisterPage.css";

export default function RegisterPage() {
  return (
    <div className="registerpage">
      <h1 className="registerpage__title">Cadastrar usuário</h1>
      <RegisterForm />
    </div>
  );
}
