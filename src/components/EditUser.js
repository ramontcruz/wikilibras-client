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

	function handleSelect(e) {
		form.estado = e.target.value;
	}

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			await api.put(`/user/edit/${user._id}`, form);
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
						{/* <DropdownButton
							id="dropdown-basic-button overflow-auto"
							title={form.estado}
						>
							<Dropdown.Item value="Acre-AC" onClick={handleSelect}>
								Acre-AC
							</Dropdown.Item>
							<Dropdown.Item value="Alagoas-AL" onClick={handleSelect}>
								Alagoas-AL
							</Dropdown.Item>
							<Dropdown.Item value="Amapá-AP" onClick={handleSelect}>
								Amapá-AP
							</Dropdown.Item>
							<Dropdown.Item value="Amazonas-AM" onClick={handleSelect}>
								Amazonas-AM
							</Dropdown.Item>
							<Dropdown.Item value="Bahia-BA" onClick={handleSelect}>
								Bahia-BA
							</Dropdown.Item>
							<Dropdown.Item value="Ceará-CE" onClick={handleSelect}>
								Ceará-CE
							</Dropdown.Item>
							<Dropdown.Item value="Distrito Federal-DF" onClick={handleSelect}>
								Distrito Federal-DF
							</Dropdown.Item>
							<Dropdown.Item value="Espírito Santo-ES" onClick={handleSelect}>
								Espírito Santo-ES
							</Dropdown.Item>
							<Dropdown.Item value="Goiás-GO" onClick={handleSelect}>
								Goiás-GO
							</Dropdown.Item>
							<Dropdown.Item value="Maranhão-MA" onClick={handleSelect}>
								Maranhão-MA
							</Dropdown.Item>
							<Dropdown.Item value="Mato Grosso-MT" onClick={handleSelect}>
								Mato Grosso-MT
							</Dropdown.Item>
							<Dropdown.Item
								value="Mato Grosso do Sul-MS"
								onClick={handleSelect}
							>
								Mato Grosso do Sul-MS
							</Dropdown.Item>
							<Dropdown.Item value="Minas Gerais-MG" onClick={handleSelect}>
								Minas Gerais-MG
							</Dropdown.Item>
							<Dropdown.Item value="Pará-PA" onClick={handleSelect}>
								Pará-PA
							</Dropdown.Item>
							<Dropdown.Item value="Paraíba-PB" onClick={handleSelect}>
								Paraíba-PB
							</Dropdown.Item>
							<Dropdown.Item value="Paraná-PR" onClick={handleSelect}>
								Paraná-PR
							</Dropdown.Item>
							<Dropdown.Item value="Pernambuco-PE" onClick={handleSelect}>
								Pernambuco-PE
							</Dropdown.Item>
							<Dropdown.Item value="Piauí-PI" onClick={handleSelect}>
								Piauí-PI
							</Dropdown.Item>
							<Dropdown.Item value="Rio de Janeiro-RJ" onClick={handleSelect}>
								Rio de Janeiro-RJ
							</Dropdown.Item>
							<Dropdown.Item
								value="Rio Grande do Norte-RN"
								onClick={handleSelect}
							>
								Rio Grande do Norte-RM
							</Dropdown.Item>
							<Dropdown.Item
								value="Rio Grande do Sul-RS"
								onClick={handleSelect}
							>
								Rio Grande do Sul-RS
							</Dropdown.Item>
							<Dropdown.Item value="Rondônia-RO" onClick={handleSelect}>
								Rondônia-RO
							</Dropdown.Item>
							<Dropdown.Item value="Roraima-RR" onClick={handleSelect}>
								Roraima-RR
							</Dropdown.Item>
							<Dropdown.Item value="Santa Catarina-SC" onClick={handleSelect}>
								Santa Catarina-SC
							</Dropdown.Item>
							<Dropdown.Item value="São Paulo-SP" onClick={handleSelect}>
								São Paulo-SP
							</Dropdown.Item>
							<Dropdown.Item value="Sergipe-SE" onClick={handleSelect}>
								Sergipe-SE
							</Dropdown.Item>
							<Dropdown.Item value="Tocantins-TO" onClick={handleSelect}>
								Tocantins-TO
							</Dropdown.Item>
						</DropdownButton>*/}
						<Form.Label>Cidade</Form.Label>
						<Form.Control
							type="text"
							name="cidade"
							value={form.cidade}
							onChange={handleSelect}
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
