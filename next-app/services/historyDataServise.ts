import endpoints from "./endpoints";
import { axiosInstance } from "./axiosInstance";

const updateData = (inputData) => {
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
    "report-id": +inputData[14],
    reportType: inputData[15],
    report_name: "asdas",
  };

  return convertedData;
};

const updateBiowallData = (inputData) => {

  const convertedData = {
    duct_information: {
      DuctWidth: parseFloat(inputData[0]),
      DuctHeight: parseFloat(inputData[1]),
      DuctLength: parseFloat(inputData[2]),
      refCofficient: parseFloat(inputData[3]),
      Airflow: parseFloat(inputData[4]),
    },
    microorganisms: !inputData[9].length
      ? inputData[5].map((data, index) => ({
          Number_of_Columns:data.Number_of_Columns,
          Number_of_Rows:data.Number_of_Rows,
          Number_of_Lamps:data.Number_of_Lamps,
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
    reportType: inputData[10],
    "report-id": inputData[11]
  };

    return convertedData
}

export const getHistoryData = async (type: string) => {
  try {
    const response = await axiosInstance.post(endpoints.historyData, {
      reportType: type,
    });
    return response.data;
  } catch (e) {
    if (e.response.data.error != undefined) {
      return e.response.data.error;
    } else {
      return e.response.data;
    }
  }
};

export const getHistoryDataRemove = async (id,type) => {
  const sendData = {
    "report-id": id,
    reportType: type
  };
  try {
    const response = await axiosInstance.delete(endpoints.historyData, {
      data: sendData,
    });
    return response.data;
  } catch (e) {
    if (e.response.data.error != undefined) {
      return e.response.data.error;
    } else {
      return e.response.data;
    }
  }
};

export const getHistoryReport = async (
  id: string | string[],
  report_type: string
) => {
  try {
    const response = await axiosInstance.post(endpoints.report, {
      "report-id": +id,
      reportType: report_type,
    });
    return response.data;
  } catch (e) {
    if (e.response.data.error != undefined) {
      return e.response.data.error;
    } else {
      return e.response.data;
    }
  }
};

export const updateHistoryReport = async (data) => {
  const sendData = updateData(data);

  try {
    const response = await axiosInstance.put(endpoints.historyData, sendData);
    return response.data;
  } catch (e) {
    if (e.response.data.error != undefined) {
      return e.response.data.error;
    } else {
      return e.response.data;
    }
  }
};

export const updateBiowallHistoryReport = async (data) => {
  const sendData = updateBiowallData(data);

  try {
    const response = await axiosInstance.put(endpoints.historyData, sendData);
    return response.data;
  } catch (e) {
    if (e.response.data.error != undefined) {
      return e.response.data.error;
    } else {
      return e.response.data;
    }
  }
};

