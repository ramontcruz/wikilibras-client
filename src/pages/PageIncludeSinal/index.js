import {
	Card,
	Container,
	Button,
	Form,
	FloatingLabel,
	Row,
	Col,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
//import axios from "axios";
import toast from "react-hot-toast";
import { api } from "../../api/api.js";
import "../../App.css";

const imagens = [
	"01.jpg",
	"02.jpg",
	"03.jpg",
	"04.jpg",
	"05.jpg",
	"06.jpg",
	"07.jpg",
	"08.jpg",
	"09.jpg",
	"10.jpg",
	"11.jpg",
	"12.jpg",
	"13.jpg",
	"14.jpg",
	"15.jpg",
	"16.jpg",
	"17.jpg",
	"18.jpg",
	"19.jpg",
	"21.jpg",
	"22.jpg",
	"24.jpg",
	"25.jpg",
	"26.jpg",
	"28.jpg",
	"32.jpg",
	"37.jpg",
	"38.jpg",
	"39.jpg",
	"40.jpg",
	"41.jpg",
	"42.jpg",
	"43.jpg",
	"44.jpg",
	"45.jpg",
	"46.jpg",
	"47.jpg",
	"48.jpg",
	"49.jpg",
	"50.jpg",
	"51.jpg",
	"52.jpg",
	"53.jpg",
	"54.jpg",
	"55.jpg",
	"56.jpg",
	"57.jpg",
	"58.jpg",
	"60.jpg",
	"61.jpg",
	"62.jpg",
	"63.jpg",
	"64.jpg",
	"65.jpg",
	"67.jpg",
	"68.jpg",
	"69.jpg",
	"70.jpg",
	"71.jpg",
	"72.jpg",
	"73.jpg",
	"74.jpg",
	"75.jpg",
	"76.jpg",
	"77.jpg",
	"78.jpg",
];

function PageIncludeSinal() {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		termo: "",
		fraseContexto: "",
		conceito: "",
		cm: "01",
		urlTermo: "",
		urlConceito: "",
		criadoPor: "",
	});

	const [user, setUser] = useState({ name: "", email: "" });

	useEffect(() => {
		async function fetchUser() {
			const response = await api.get("/user/profile");
			setUser(response.data);
		}

		fetchUser();
	}, []);

	function handleChange(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	function handleSelect(e) {
		const entrada = e.target.src;
		const inicio = entrada.length-6;
		const fim = entrada.length-4;
		const cmdaEntrada = entrada.substring(inicio,fim);
		console.log("entrada ",entrada.substring(inicio,fim))
		
		form.cm = cmdaEntrada;
	}

	async function handleSubmit(e) {
		e.preventDefault();

		if (
			!form.termo ||
			!form.fraseContexto ||
			!form.conceito ||
			/*!form.cm ||*/
			!form.urlTermo ||
			!form.urlConceito
		) {
			toast.error("Preencha todos os campos");
			return;
		}
		//form.cm = "01";
		form.criadoPor = user.id;

		await api.post("/termo/new-termo", form);
		setForm({
			termo: "",
			fraseContexto: "",
			conceito: "",
			cm: "",
			urlTermo: "",
			urlConceito: "",
		});

		navigate("/");
		toast("Termo incluído com sucesso!", {
			icon: "👏",
			style: {
				borderRadius: "10px",
			},
			duration: 2000,
		});
	}

	return (
		<div>
			<Container>
				<Card className="bg-dark">
					<Form>
						<FloatingLabel label="Termo" className="mb-3">
							<Form.Control
								id="basic-addon1"
								aria-label="With textarea"
								type="text"
								onChange={handleChange}
								name="termo"
								value={form.termo}
								placeholder="Termo"
							/>
						</FloatingLabel>
						<FloatingLabel label="Frase de Exemplo" className="mb-3">
							<Form.Control
								id="basic-addon1"
								aria-label="With textarea"
								type="text"
								onChange={handleChange}
								name="fraseContexto"
								value={form.fraseContexto}
								placeholder="Frase de Exemplo"
							/>
						</FloatingLabel>
						<FloatingLabel label="Conceito" className="mb-3">
							<Form.Control
								id="basic-addon1"
								aria-label="With textarea"
								type="text"
								onChange={handleChange}
								name="conceito"
								value={form.conceito}
								placeholder="Conceito"
							/>
						</FloatingLabel>
						<div className="dropdown">
							<button
								className="btn btn-secondary dropdown-toggle"
								type="button"
								id="dropdownMenuButton"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Configuração de Mão
							</button>
							<div
								className="dropdown-menu overflow-auto"
								aria-labelledby="dropdownMenuButton"
								id="dropdown-basic-button"
								title="Configuração de mão"
								onSelect={handleSelect}
								name="cm"
							>
								<div className="row no-gutters">
									{imagens.map((imagem) => {
										return (
											<img
												className="dropdown-item"
												name="cm"
												value="1"
												onClick={handleSelect}
												key={imagem}
												src={`/${imagem}`}
												alt="3"
												height="80px"
												width="100px"
											/>
										);
									})}
								</div>
							</div>
						</div>
						<FloatingLabel label="Link do vídeo com o termo" className="mb-3">
							<Form.Control
								id="basic-addon1"
								aria-label="With textarea"
								type="text"
								onChange={handleChange}
								name="urlTermo"
								value={form.urlTermo}
								placeholder="Link do vídeo com o termo"
							/>
						</FloatingLabel>
						<FloatingLabel
							label="Link do vídeo com o conceito"
							className="mb-3"
						>
							<Form.Control
								id="basic-addon1"
								aria-label="With textarea"
								type="text"
								onChange={handleChange}
								name="urlConceito"
								value={form.urlConceito}
								placeholder="Link do vídeo com o contexto"
							/>
						</FloatingLabel>

						<Row>
							<Col>
								<Link to={"/"}>
									<Button variant="secondary" size="lg" className="mb-3">
										Voltar
									</Button>
								</Link>
							</Col>
							<Col>
								<Button
									variant="success"
									size="lg"
									className="mb-3"
									onClick={handleSubmit}
								>
									Incluir
								</Button>
							</Col>
						</Row>
					</Form>
				</Card>
			</Container>
		</div>
	);
}

export default PageIncludeSinal;
