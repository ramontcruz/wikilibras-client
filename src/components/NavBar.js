import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Libras from "../assets/sinalLibras.png";
import "./NavBar.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext.js"

function NavBar() {
  const { loggedInUser} = useContext(AuthContext);
  return (
    <nav  className="navBar">
      <div className="divImagem">
        <img 
          alt=""
          src={Libras}
          width="70"
          height="70"
          className="d-inline-block align-top"
        />

        <div  className="navList">
          <ul className="navList">
            <li>
              <Link to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/biblioteca">
                Biblioteca
              </Link>
            </li>
            <li>
              <Link to="/profile">
                Meu Perfil
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {!loggedInUser && (
      <div> 
        <Link to="/login">
          <button className="botaoNav">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="botaoNav">
            Cadastro
          </button>
        </Link>
      </div>
      )}
       {loggedInUser && (
      <div> 
        <Link to="/biblioteca">
          <button className="botaoNav">
            Biblioteca
          </button>
        </Link>
        <Link to="/">
          <button className="botaoNav">
            Meu Perfil
          </button>
        </Link>
      </div>
      )}
    </nav>
  );
}

export default NavBar;

// {/* <Navbar bg="info" variant="dark">
//       <Container>
//         <div className="navBar">
//           <Navbar.Brand href="/">
//             <div>
//               <img
//                 alt=""
//                 src={Libras}
//                 width="70"
//                 height="70"
//                 className="d-inline-block align-top"
//               />{' '}
//             </div>
//           </Navbar.Brand>
//           <div>
//             <br />
//             <div>
//                 WikiLibras
//                 </div>

//           </div> */}
//         </div>
//       </Container>
//     </Navbar>
