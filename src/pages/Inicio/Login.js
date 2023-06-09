import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FormBox, StartBox } from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../constants/urls";
import { ThreeDots } from "react-loader-spinner";

export default function Login({ setUsuarioLogado }) {
  const navigate = useNavigate();
  const [loginUsuario, setLoginUsuario] = useState({
    email: "",
    password: "",
  });
  const [carregando, setCarregando] = useState(false);

  //Atualiza e armazena o estado de cadastro do usuário
  function handleChange(e) {
    setLoginUsuario({ ...loginUsuario, [e.target.name]: e.target.value });
  }

  //Procura se tem um usuário já logado
  useEffect(() => {
    const listaSerializada = localStorage.getItem("lista");
    const lista = JSON.parse(listaSerializada);
    if (lista !== null) {
      //Encontrou registro de usuário
      setUsuarioLogado(lista);
      navigate("/hoje");
    }
  }, [setUsuarioLogado, navigate]);

  function login(e) {
    setCarregando(true);
    e.preventDefault();
    const url = `${BASE_URL}/auth/login`;
    axios
      .post(url, loginUsuario)
      .then((res) => {
        console.log(res);
        setUsuarioLogado(res.data);
        //Cria um localStorage para os dados do usuário
        const dadosSerializados = JSON.stringify(res.data); // String '{"nome":"Pedro","idade":30}'
        localStorage.setItem("lista", dadosSerializados);
        navigate("/hoje");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert(err.message); //mensagem padrão do axios
        }
        setCarregando(false);
      });
  }

  console.log(loginUsuario);

  return (
    <StartBox>
      <img src={logo} alt="" />
      <FormBox onSubmit={login}>
        <input
          data-test="email-input"
          type="email"
          placeholder="email"
          name={"email"}
          value={loginUsuario.email}
          onChange={handleChange}
          disabled={carregando}
          required
        />
        <input
          data-test="password-input"
          type="password"
          placeholder="senha"
          name={"password"}
          value={loginUsuario.password}
          onChange={handleChange}
          disabled={carregando}
          required
        />
        <button data-test="login-btn" type="submit" disabled={carregando}>
          {carregando ? (
            <ThreeDots
              height="50"
              width="50"
              radius="9"
              color="#FFFFFF"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            "Entrar"
          )}
        </button>
      </FormBox>

      <Link data-test="signup-link" to="/cadastro">
        Não tem uma conta? Cadastre-se!
      </Link>
    </StartBox>
  );
}
