import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import "./RegisterModal.css";

function RegisterModal({ onClose }) {
	const { onRegister } = useContext(AuthContext);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setError("Las contraseñas no coinciden");
			return;
		}

		const result = await onRegister(username, email, password);
		if (result?.error) {
			setError(result.error);
		} else {
			onClose();
		}
	};

	return (
		<div className="register-modal">
			<button className="close-button" onClick={onClose}>x</button>
			<h2>Registrarse</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario" />

				<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

				<input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />

				<input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmar Contraseña" />

				{error && <p className="modal-error">{error}</p>}
				<button type="submit">Registrarse</button>
			</form>
		</div>
	);
};

export default RegisterModal;