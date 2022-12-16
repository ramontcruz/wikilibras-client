import { Modal, Button, Form, Dropdown, DropdownButton } from "react-bootstrap";
import { useState, useEffect } from "react";
import { api } from "../api/api";

function EditUser({ form, setForm, reload, setReload }) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [user, setUser] = useState({});

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

	async function handleSubmit(e) {
		e.preventDefault();
		const {id} = req.params;
		try {
			await api.put(`/user/edit/${id}`, form);
			setShow(false);
			setReload(!reload);
		} catch (error) {
			console.log(error);
			alert("Algo deu errado");
		}
	}

	return (
		<div>
			<Button variant="primary" onClick={handleShow}>
				Editar Usuário
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edite seus dados</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3">
						<Form.Label>Nome do Usuário</Form.Label>
						<Form.Control
							type="text"
							name="name"
							value={form.name}
							onChange={handleChange}
						/>
						<Form.Label>Telefone</Form.Label>
						<Form.Control
							type="text"
							name="phone"
							value={form.phone}
							onChange={handleChange}
						/>
						<DropdownButton
							id="dropdown-basic-button overflow-auto"
							title={form.estado}
						>
							<Dropdown.Item value="Acre-AC" onClick={handleChange}>
								Acre-AC
							</Dropdown.Item>
							<Dropdown.Item value="Alagoas-AL" onClick={handleChange}>
								Alagoas-AL
							</Dropdown.Item>
							<Dropdown.Item value="Amapá-AP" onClick={handleChange}>
								Amapá-AP
							</Dropdown.Item>
							<Dropdown.Item value="Amazonas-AM" onClick={handleChange}>
								Amazonas-AM
							</Dropdown.Item>
							<Dropdown.Item value="Bahia-BA" onClick={handleChange}>
								Bahia-BA
							</Dropdown.Item>
							<Dropdown.Item value="Ceará-CE" onClick={handleChange}>
								Ceará-CE
							</Dropdown.Item>
							<Dropdown.Item value="Distrito Federal-DF" onClick={handleChange}>
								Distrito Federal-DF
							</Dropdown.Item>
							<Dropdown.Item value="Espírito Santo-ES" onClick={handleChange}>
								Espírito Santo-ES
							</Dropdown.Item>
							<Dropdown.Item value="Goiás-GO" onClick={handleChange}>
								Goiás-GO
							</Dropdown.Item>
							<Dropdown.Item value="Maranhão-MA" onClick={handleChange}>
								Maranhão-MA
							</Dropdown.Item>
							<Dropdown.Item value="Mato Grosso-MT" onClick={handleChange}>
								Mato Grosso-MT
							</Dropdown.Item>
							<Dropdown.Item
								value="Mato Grosso do Sul-MS"
								onClick={handleChange}
							>
								Mato Grosso do Sul-MS
							</Dropdown.Item>
							<Dropdown.Item value="Minas Gerais-MG" onClick={handleChange}>
								Minas Gerais-MG
							</Dropdown.Item>
							<Dropdown.Item value="Pará-PA" onClick={handleChange}>
								Pará-PA
							</Dropdown.Item>
							<Dropdown.Item value="Paraíba-PB" onClick={handleChange}>
								Paraíba-PB
							</Dropdown.Item>
							<Dropdown.Item value="Paraná-PR" onClick={handleChange}>
								Paraná-PR
							</Dropdown.Item>
							<Dropdown.Item value="Pernambuco-PE" onClick={handleChange}>
								Pernambuco-PE
							</Dropdown.Item>
							<Dropdown.Item value="Piauí-PI" onClick={handleChange}>
								Piauí-PI
							</Dropdown.Item>
							<Dropdown.Item value="Rio de Janeiro-RJ" onClick={handleChange}>
								Rio de Janeiro-RJ
							</Dropdown.Item>
							<Dropdown.Item
								value="Rio Grande do Norte-R"
								onClick={handleChange}
							>
								Rio Grande do Norte-R
							</Dropdown.Item>
							<Dropdown.Item
								value="Rio Grande do Sul-RS"
								onClick={handleChange}
							>
								Rio Grande do Sul-RS
							</Dropdown.Item>
							<Dropdown.Item value="Rondônia-RO" onClick={handleChange}>
								Rondônia-RO
							</Dropdown.Item>
							<Dropdown.Item value="Roraima-RR" onClick={handleChange}>
								Roraima-RR
							</Dropdown.Item>
							<Dropdown.Item value="Santa Catarina-SC" onClick={handleChange}>
								Santa Catarina-SC
							</Dropdown.Item>
							<Dropdown.Item value="São Paulo-SP" onClick={handleChange}>
								São Paulo-SP
							</Dropdown.Item>
							<Dropdown.Item value="Sergipe-SE" onClick={handleChange}>
								Sergipe-SE
							</Dropdown.Item>
							<Dropdown.Item value="Tocantins-TO" onClick={handleChange}>
								Tocantins-TO
							</Dropdown.Item>
						</DropdownButton>
						<Form.Label>Cidade</Form.Label>
						<Form.Control
							type="text"
							name="cidade"
							value={form.cidade}
							onChange={handleChange}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Fechar
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						Salvar
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default EditUser;
