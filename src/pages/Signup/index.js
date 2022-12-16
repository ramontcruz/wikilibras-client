import { useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [img, setImg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      const response = await api.post("/uploadImage", uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const imgURL = await handleUpload();
      await api.post("/user/sign-up", { ...form, img: imgURL });

      navigate("/login");
      toast.success("Usuário criado");
      toast.success("Usuário criado");
    } catch (error) {
      toast.error("Preencha todos os campos");
      toast.error("Preencha todos os campos");
      console.log(error);
    }
  }
return (
		
			<form className="d-flex justify-content-center" onSubmit={handleSubmit}>
				<div className="form-group">
        <div className="col my-1">
					<label htmlFor="formName">Nome:</label>
					<input
						id="formName"
						name="name"
						type="text"
						value={form.name}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-control-file my-1">
					<label htmlFor="formImg">Sua foto de perfil:</label>
					<input
						type="file"
						id="formImg"
						onChange={handleImage}
						className="form-control"
					/>
				</div>
				<div className="my-1">
					<label htmlFor="formEmail">E-mail:</label>
					<input
						id="formEmail"
						name="email"
						type="email"
						value={form.email}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="my-1">
					<label htmlFor="formPassword">Senha:</label>
					<input
						id="formPassword"
						name="password"
						type="password"
						value={form.password}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="my-1">
					<label htmlFor="formConfirmPassword">Confirmação de senha</label>
					<input
						id="formConfirmPassword"
						type="password"
						name="confirmPassword"
						value={form.confirmPassword}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<button type="submit" className="btn btn-outline-primary my-1">
					Cadastrar
				</button>
      </div>
    </form>
  );
}
