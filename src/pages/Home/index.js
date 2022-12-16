import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Home.css";

function Home() {
  return (
    <div>
      <div className="divHome">
        <Container>
          {/* <Card className="container text-center"> */}
          <div className="row">
            <div className="col">
              <Card.Body>
                <h1 className="titulo">
                  WIKILIBRAS É UM PORTAL DE COLABORAÇÃO DA LÍNGUA BRASILEIRA DE
                  SINAIS
                </h1>
              </Card.Body>
              <Row>
                <Col>
                  <p>
                    Esse é um site interativo que busca compartilhar termos em
                    Libras e em Português. Para iniciar sua pesquisa ou busca
                    por um termo, basta clicar no botão abaixo e seguir para
                    nossa biblioteca. A atualização é instantânea e sempre pode
                    ter a inclusão de novos termos..
                  </p>
                </Col>
              </Row>
            </div>
            <div className="video1 col">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/oqBlam1dLy4?playlist=oqBlam1dLy4&loop=1;rel=0&autoplay=1&controls=0&showinfo=0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            </div>
          </div>
          {/* </Card> */}
          <p>
            
          </p>
        </Container>
        <div className="divBotao">
          <Link to={"/Biblioteca/"}>
            <Button className="botaoTermo">Buscar por um termo</Button>
          </Link>
        </div>
      </div>
    </div>
  );

}

export default Home;
