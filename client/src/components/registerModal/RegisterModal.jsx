import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

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
				<label>Nombre:
					<input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
				</label>
				<label>Email:
					<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
				</label>
				<label>Contraseña:
					<input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
				</label>
				<label>Confirmar Contraseña:
					<input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
				</label>
				{error && <p className="modal-error">{error}</p>}
				<button type="submit">Registrarse</button>
			</form>
		</div>
	);
};

export default RegisterModal;