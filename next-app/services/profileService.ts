import endpoints from "./endpoints";
import { axiosInstance } from "./axiosInstance";

const getUser = async (): Promise<boolean> => {
  try {
    const response = await axiosInstance.get(endpoints.getUser);
    const data = response.data;

    if (data) {
      return data;
    }
    return false;
  } catch {
    return false;
  }
};

const editUserDataRequests = async (profileImage, name = "") => {
  try {
    let inputData: { name?: string; profileImage? };
    if (profileImage && name) {
      inputData = {
        name: name,
        profileImage: profileImage,
      };
    } else if (name) {
      inputData = {
        name: name,
      };
    } else {
      inputData = profileImage;
    }

    await axiosInstance.put(endpoints.edit, inputData);

    return true;
  } catch (e) {
    if (e.response.data.error != undefined) {
      return e.response.data.error;
    } else {
      return e.response.data;
    }
  }
};

const deleteProfile = async (): Promise<any> => {
  try {
    await axiosInstance.delete(endpoints.delete);

    return true;
  } catch (e) {
    return e.response.data.error;
  }
};

export { getUser, editUserDataRequests, deleteProfile };
