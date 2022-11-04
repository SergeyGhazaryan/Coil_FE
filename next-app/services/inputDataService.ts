import endpoints from "./endpoints";
import { axiosInstance } from "./axiosInstance";

const optimizeData = (inputData) => {
  const convertedData = {
    duct_information: {
      x: parseFloat(inputData[0]),
      y: parseFloat(inputData[1]),
      downstream_coeff: parseFloat(inputData[2]),
      max_dist_to_coil: parseFloat(inputData[3]),
    },
    inactivation_params: {
      required_inactivation_rate: parseFloat(inputData[4]),
      "max-inactivation_time": parseFloat(inputData[5]),
    },
    target_information: {
      susceptibilityc_coefficient: parseFloat(inputData[6]),
    },
    uv_intensity: {
      minimum_UV_irr_intensity: parseFloat(inputData[7]),
    },
    common_Information: {
      reflection_coeff: parseFloat(inputData[8]),
      "min-dist-wall-x": parseFloat(inputData[9]),
      "min-dist-wall-y": parseFloat(inputData[10]),
    },
    microorganism_option: inputData[11],
    opt_type: inputData[12],
    option: inputData[13],
    report_name: inputData[14],
  };

  return convertedData;
};

const bioWallOptimizeData = (inputData) => {
  const convertedData = {
    duct_information: {
      DuctWidth: parseFloat(inputData[0]),
      DuctHeight: parseFloat(inputData[1]),
      DuctLength: parseFloat(inputData[2]),
      refCofficient: parseFloat(inputData[3]),
      Airflow: parseFloat(inputData[4]),
    },
    microorganisms: inputData[5],
    inact_passes: parseFloat(inputData[6]),
    inact_rate: parseFloat(inputData[7]),
  };

  return convertedData;
};

const bioWallImagesData = (inputData) => {
  inputData[9].forEach((element, index) => {
    element.LayerNumber = index + 1;
    element.Number_of_Lamps = 1;
  });
  const convertedData = {
    duct_information: {
      DuctWidth: parseFloat(inputData[0]),
      DuctHeight: parseFloat(inputData[1]),
      DuctLength: parseFloat(inputData[2]),
      refCofficient: parseFloat(inputData[3]),
      Airflow: 100,
    },
    microorganisms: !inputData[9].length
      ? inputData[5].map((data, index) => ({
          Number_of_Columns: data.Number_of_Columns,
          Number_of_Rows: data.Number_of_Rows,
          Number_of_Lamps: data.Number_of_Lamps,
          LayerNumber: index + 1,
          ModelName: data.Model_Name,
        }))
      : inputData[9],
    response3: inputData[6].map((data) => ({
      Microorganism: data.name,
      SusceptibilityCoeff: data.sum,
    })),
    inact_passes: +inputData[7],
    layer_numbers: !inputData[9].length
      ? inputData[5].length
      : inputData[9].length,
    report_name: inputData[8],
  };

  return convertedData;
};

const getImages = async (inputData) => {
  const sendData = optimizeData(inputData);
  try {
    const response = await axiosInstance.post(endpoints.images, sendData);
    return response.data;
  } catch (e) {
    if (e.response.data.error != undefined) {
      return e.response.data.error;
    } else {
      return e.response.data;
    }
  }
};

const getBiowallImages = async (inputData) => {
  const sendData = bioWallImagesData(inputData);
  try {
    const response = await axiosInstance.post(
      endpoints.biowall_images,
      sendData
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

const getCoilOptimize = async (inputData) => {
  const sendData = optimizeData(inputData);
  const response = await axiosInstance.post(endpoints.optimize, sendData);
  const data = response.data;
  if (data) {
    return data["results"];
  }
  return false;
};

const getBioWhallOptimize = async (inputData) => {
  const sendData = bioWallOptimizeData(inputData);
  const response = await axiosInstance.post(
    endpoints.optimize_biowall,
    sendData
  );
  const data = response.data;
  if (data) {
    return data["optimized"];
  }
  return false;
};

export {
  getImages,
  optimizeData,
  getCoilOptimize,
  getBiowallImages,
  getBioWhallOptimize,
};

