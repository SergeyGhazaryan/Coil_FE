import endpoints from "./endpoints";
import { axiosInstance } from "./axiosInstance";

export const getImagesData = async () => {
  try {
    const response = await axiosInstance.get(endpoints.historyData);
    return response.data;
  } catch (e) {
    if (e.response.data.error != undefined) {
      return e.response.data.error;
    } else {
      return e.response.data;
    }
  }
};

export const sendImagesData = async (type, data) => {
  try {
    const response = await axiosInstance.post(
      type === "coil" ? endpoints.images : endpoints.biowall_images,
      { data: data }
    );
    return response.data;
  } catch (e) {
    if (e.response.data.error != undefined) {
      return e.response.data.error;
    } else {
      return e.response.data;
    }
  }
};
