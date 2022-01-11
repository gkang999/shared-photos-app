import axios from "axios";

const API_URL = "http://localhost:3308/accounts/";

const register = async (username, name, email, password) => {
    const response = await axios.post(API_URL + "create", {
        AccountName: username,
        AccountOwner: name,
        AccountEmail: email,
        AccountPassword: password,
        RoleType: "user"
    });
    if (response[0] != null) {
        return(<div>test1</div>);
    }
    else {
        return(<div>test</div>);
    }
};

const login = async (username, password) => {
    const response = await axios
        .post(API_URL + "login", {
            accountName: username,
            accountPass: password
        });
    if (response.data.accessToken) {
        localStorage.setItem('currentAccount', JSON.stringify(response.data));
        localStorage.setItem('SPDKSessionKey', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('currentAccount');
    localStorage.removeItem('SPDKSessionKey');
}

export default {
    register,
    login,
    logout,
}