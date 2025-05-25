import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import './LoginModal.css';

function LoginModal({ onClose }) {
	const { onLogin } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await onLogin(email, password);
		if (result?.error) {
			setError(result.error);
		} else {
			onClose();
		};
	}

	return (
		<div className="login-modal">
			<div className="modal">
				<button className="close-button" onClick={onClose}>x</button>
				<h2>Iniciar Sesión</h2>
				<form onSubmit={handleSubmit}>
					<label>Email: 
						<input type="email" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
					</label>
					<label>Contraseña:
						<input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
					</label>
					{error && <p className="modal-error">{error}</p>}
					<button type="submit">Iniciar Sesión</button>
				</form>
			</div>
		</div>
	)
}

export default LoginModal;