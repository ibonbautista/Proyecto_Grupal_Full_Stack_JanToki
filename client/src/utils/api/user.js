import fetchData from "./fetch";

export async function updateUser(updateData) {
	const data = {
		username: updateData.username,
		email: updateData.email,
	}
	if (updateData.password && updateData.password.trim() !== "") {
		data.password = updateData.password;
	}
	const result = await fetchData("/user/me", "PUT", data);
	return result;
	
}