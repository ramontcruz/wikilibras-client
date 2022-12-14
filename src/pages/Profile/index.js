//import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
//import { api } from "../../api/api";

import { Button, Col, Container, Card, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import {api} from "../../api/api.js";
import EditUser from "../../components/EditUser";

export function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  

  //importados de week7client
  const { setLoggedInUser } = useContext(AuthContext);
  //const [user, setUser] = useState({});
  const [form, setForm] = useState({
    name: "",
  });
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const response = await api.get("/user/profile");
      setUser(response.data);
    }

    fetchUser();
  }, []);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
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
              <h1>{user.name}</h1>
              <p>{user.email}</p>
            </Card>
          </Col>
          <Col>
            <img src={user.profilePic} alt="profile Pic" className="rounded" />
          </Col>
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
            <Link to="/tasks">
              <Button variant="dark">Minhas Tarefas</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
