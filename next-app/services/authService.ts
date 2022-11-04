import endpoints from "../services/endpoints";
import { axiosInstance } from "./axiosInstance";
import {
  clearLocalStorage,
  setItemInLocalStorage,
} from "./localStorageService";
import localStorageKeys from "constants/localStorageKeys";
import { User, UserChangePassword, UserLogout, UserSignup } from "types/auth";

const login = async (username: string, password: string): Promise<User> => {
  try {
    const response = await axiosInstance.post(endpoints.login, {
      auth: {
        username,
        password,
      },
    });
    const data = response.data;
    localStorage.setItem("token", data["token"]);
    return response.data;
  } catch (e) {
    return e.response.data.error;
  }
};

const loginByGoogle = async (google_token: string): Promise<boolean> => {
  try {
    localStorage.setItem("token", google_token);
    const response = await axiosInstance.get(endpoints.googleLogin);
    const data = response.data;
    if (data["token"]) {
      localStorage.setItem("token", data["token"]);
      return true;
    }

    return false;
  } catch {
    return false;
  }
};

const logout = async (): Promise<UserLogout> => {
  try {
    const response = await axiosInstance.get(endpoints.logout);
    if (response.statusText === "OK") {
      clearLocalStorage();
      return response.data;
    }

    return response.data;
  } catch (e) {
    return e.response.data.message;
  }
};

const signup = async (
  email: string,
  password: string,
  name: string,
  role: string
): Promise<UserSignup> => {
  try {
    const response = await axiosInstance.post(endpoints.signUp, {
      name: name,
      email: email,
      password: password,
      role: role,
    });

    const data = response.data;
    setItemInLocalStorage(localStorageKeys.token, data[localStorageKeys.token]);
    return response.data;
  } catch (e) {
    return e.response.data.error;
  }
};

const signupByGoogle = async (google_token: string): Promise<boolean> => {
  try {
    localStorage.setItem("token", google_token);
    setItemInLocalStorage(localStorageKeys.token, google_token);
    const response = await axiosInstance.get(endpoints.googleSignUp);
    const data = response.data;
    if (data["token"]) {
      localStorage.setItem("token", data["token"]);
      setItemInLocalStorage(
        localStorageKeys.token,
        data[localStorageKeys.token]
      );
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

const changePassword = async (
  password: string
): Promise<UserChangePassword> => {
  try {
    const response = await axiosInstance.put(endpoints.changePassword, {
      password,
    });
    return response.data;
  } catch (e) {
    return e.response.data.error;
  }
};

const forgotPassword = async (email: string) => {
  try {
    const response = await axiosInstance.post(endpoints.recover, email);

    return response.data;
  } catch (e) {
    return e.response.data.error;
  }
};

const recoveryPassword = async (
  password: string,
  token: string
): Promise<string | boolean> => {
  try {
    let response = await axiosInstance.put(endpoints.forgotPassword, {
      token: token,
      password: password,
    });

    return true;
  } catch (e) {
    return e.response.data.error;
  }
};

export {
  login,
  loginByGoogle,
  logout,
  signup,
  signupByGoogle,
  changePassword,
  forgotPassword,
  recoveryPassword,
};
