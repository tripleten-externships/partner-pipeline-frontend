const tokenKey: string = process.env.TOKEN_KEY || "";
//this will need to be set from the .env file on the host. Currently just a placeholder "extremely_secret_32character_key"

const setToken = (token: string) => localStorage.setItem(tokenKey, token);
//function to set token in local storage

const getToken = () => {
  return localStorage.getItem(tokenKey);
};
//function to retrieve token if user is logged in

const removeToken = () => {
  localStorage.removeItem(tokenKey);
};
//function to logout and clear token

export { setToken, getToken, removeToken };