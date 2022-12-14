import {
	Row,
	Col,
	Button,
	Container,
	Card,
	Form,
	FloatingLabel,
	ButtonGroup,
} from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Modal from "react-bootstrap/Modal";
import { api } from "../../api/api.js";

function PageSinal() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [termo, setTermo] = useState({});
	const [user, setUser] = useState({ name: "", email: "" });
	const [reload, setReload] = useState(false);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [form, setForm] = useState({
		termo: "",
		fraseContexto: "",
		conceito: "",
		cm: "",
		urlTermo: "",
		urlConceito: "",
		criadoPor: "",
	});
	let urlTermo = form.urlTermo;
	let urlConceito = form.urlConceito;

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

	useEffect(() => {
		async function fetchTermo() {
			const response = await api.get(`/termo/termo/${id}`);
			setTermo(response.data);

			setForm(response.data);
		}

		fetchTermo();
	}, [reload, id]);

	function handleReload() {
		setReload(!reload);
	}

	function handleSelect(e) {
		const entrada = e.target.src;
		const inicio = entrada.length-6;
		const fim = entrada.length-4;
		const cmdaEntrada = entrada.substring(inicio,fim);
		console.log("entrada ",entrada.substring(inicio,fim))
		
		form.cm = cmdaEntrada;
	}

	async function handleDelete() {
		await api.delete(`/termo/delete/${id}`);
		navigate("/");
		toast.error("Termo exclu??do!", {
			style: {
				borderRadius: "10px",
			},
			duration: 2000,
		});
	}
	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const clone = { ...form };
			clone.criadoPor = user.id;
			delete clone._id;
			await api.put(`/termo/edit/${id}`, clone);
			setReload(!reload);
			setShow(false);
		} catch (error) {
			console.log(error);
		}

		handleReload();
		toast.success("Termo editado!");
		setShow(false);
	}

	function handleChange(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	//c??digo tratando shorts e watch
	if (urlTermo.includes("watch?v=") === true) {
		urlTermo = termo.urlTermo.replace("watch?v=", "embed/");
	}
	if (urlTermo.includes("shorts") === true) {
		urlTermo = termo.urlTermo.replace("shorts", "embed");
	}
	if (urlConceito.includes("watch?v=") === true) {
		urlConceito = termo.urlConceito.replace("watch?v=", "embed/");
	}
	if (urlConceito.includes("shorts") === true) {
		urlConceito = termo.urlConceito.replace("shorts", "embed");
	}

	return (
		<Container>
			<Card>
				<div key={termo._id}>
					<Row>
						<Col>
							<iframe
								width="300"
								height="200"
								src={urlTermo}
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						</Col>
						<Col>
							<iframe
								width="300"
								height="200"
								src={urlConceito}
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						</Col>
					</Row>
					<Row>
						<Col>
							<h4>Termo</h4>
							<h5>{termo.termo}</h5>
						</Col>

						<Col>
							<h4>Conceito</h4>
							<h5>{termo.conceito}</h5>
						</Col>
					</Row>
					<Row>
						<Col>
							<h5>Frase de Exemplo</h5>
							<h6>{termo.fraseContexto}</h6>
						</Col>
						<Row>
							<Col>
								<h6>Configura????o de M??o</h6>
								<img src={`/${termo.cm}.jpg`} alt="3" height="100px" />
							</Col>
						</Row>
					</Row>
				</div>
				<Row>
					<Col>
						<Link to={"/Biblioteca/"}>
							<Button variant="secondary" size="lg" className="mb-3">
								Voltar
							</Button>
						</Link>
					</Col>
					<Col>
						<Button
							variant="primary"
							size="lg"
							className="mb-3"
							onClick={handleShow}
						>
							Editar
						</Button>
					</Col>
				</Row>
			</Card>
			<Modal
				show={show}
				onHide={handleClose}
				aria-labelledby="contained-modal-title-vcenter"
				centered
				className="overflow-auto"
			>
				<Modal.Header closeButton className="bg-warning">
					<Modal.Title>Editar Termo</Modal.Title>
				</Modal.Header>
				<Card className="bg-dark">
					<Form className="mx-3">
						<FloatingLabel label="Termo" className="my-3">
							<Form.Control
								id="basic-addon1"
								aria-label="With textarea"
								type="text"
								onChange={handleChange}
								name="termo"
								value={form.termo}
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
								Configura????o de M??o
							</button>
							<div
								className="dropdown-menu overflow-auto"
								aria-labelledby="dropdownMenuButton"
								id="dropdown-basic-button"
								title="Configura????o de m??o"
								onSelect={handleSelect}
								name="cm"
							>
								<div className="row">
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
						<FloatingLabel label="Link do v??deo com o termo" className="mb-3">
							<Form.Control
								id="basic-addon1"
								aria-label="With textarea"
								type="text"
								onChange={handleChange}
								name="urlTermo"
								value={form.urlTermo}
								placeholder="Link do v??deo com o termo"
							/>
						</FloatingLabel>
						<FloatingLabel
							label="Link do v??deo com o contexto"
							className="mb-3"
						>
							<Form.Control
								id="basic-addon1"
								aria-label="With textarea"
								type="text"
								onChange={handleChange}
								name="urlConceito"
								value={form.urlConceito}
							/>
						</FloatingLabel>
						<Container className="buttonGroup">
							<ButtonGroup>
								<Button
									variant="secondary"
									size="lg"
									className="mb-3"
									onClick={handleClose}
								>
									Voltar
								</Button>
								<Button
									variant="danger"
									size="lg"
									className="mb-3"
									onClick={handleDelete}
								>
									Excluir termo
								</Button>
								<Button
									variant="success"
									size="lg"
									className="mb-3"
									onClick={handleSubmit}
								>
									Salvar altera????es
								</Button>
							</ButtonGroup>
						</Container>
					</Form>
				</Card>
			</Modal>
		</Container>
	);
}

export default PageSinal;
