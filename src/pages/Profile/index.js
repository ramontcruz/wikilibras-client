//import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
//import { api } from "../../api/api";

import { Button, Col, Container, Card, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { api } from "../../api/api.js";
import EditUser from "../../components/EditUser";

export function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    estado: "",
    cidade: "",
    created: [],
    edited: [],
  });
  const navigate = useNavigate();

  //importados de week7client
  const { setLoggedInUser } = useContext(AuthContext);
  //const [user, setUser] = useState({});
  const [form, setForm] = useState({
    name: "",
  });
  const [reload, setReload] = useState(false);
  //const [termo, setTermo] = useState([]);
  //const [idTermo, setIdTermo] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const response = await api.get("/user/profile");
      setUser(response.data);
    }
    fetchUser();
  }, []);
  /*
  useEffect(() => {
    async function fetchTermo() {
      idTermo.map((id)=>{
      const response = await api.get(`/termo/termo/${idTermo}`);
      setTermo(response.data);
      })
    }
    fetchTermo();
    },
     [idTermo]);

  async function capturaTermos() {
    try {
      user.created.map((item) => { 
        return(setIdTermo(item))
      })
    } catch (error) {
      console.log(error);
      alert("Algo deu errado na captura de termos");
    }
  }
  */

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/");
  }

  async function handleDeleteUser() {
    try {
      await api.delete("/user/delete");
      handleLogOut();
    } catch (error) {
      console.log(error);
      alert("Algo deu errado no delete do user");
    }
  }

  return (
    <div>
      <Container className="mt-5">
        <Row className="align-items-center mb-5">
          <Col>
            <Card>
              <h1>Bem vindo(a), {user.name}</h1>
              <p>Email: {user.email}</p>
              <p>Telefone: {user.phone}</p>
              {/* <p>Estado: {user.estado}</p> */}
              <p>Cidade: {user.cidade}</p>
              <p>Perfil: {user.role}</p>
              <p>
                Termos Criados:{" "}
                {user.created.map(item => {
                  return <p>{item}</p>;
                })}
              </p>
              <p>
                Termos Editados:{" "}
                {user.edited.map(item => {
                  return <p>{item}</p>;
                })}
              </p>
            </Card>
          </Col>
          {/* <Col>
            <img src={user.profilePic} alt="profile Pic" className="rounded" />
          </Col> */}
        </Row>

        <Row>
          <Col>
            <EditUser
              form={form}
              setForm={setForm}
              setReload={setReload}
              reload={reload}
            />
          </Col>
          <Col>
            <Button variant="danger" onClick={handleDeleteUser}>
              Excluir perfil
            </Button>
          </Col>

          <Col>
            <Button variant="dark" onClick={handleLogOut}>
              Sign Out
            </Button>
          </Col>
          <Col>
            <Link to="/biblioteca">
              <Button variant="dark">Acessar Bilioteca</Button>
            </Link>
          </Col>
        </Row>
        <Col>
          <div className="divBotao">
            <Link to={"/novotermo"}>
              <Button className="botaoTermo">Incluir um termo</Button>
            </Link>
          </div>
        </Col>
      </Container>
    </div>
  );
}
