import { MenuItem, Select, TextField } from "@mui/material";
import LayersTable from "../layersTable";
import { ILayersParametersProps } from "./types";

import styles from "./layersParameters.module.scss";
import { LayersData } from "components/feature/Biowall_edit/types";

export const LayersParameters: React.FC<ILayersParametersProps> = ({
  handleLayersNumber,
  tableStateValues,
  layersNumber,
  handleChangeLayer,
  layersInfo,
}) => {
  return (
    <>
      <TextField
        label="Number of layers"
        style={{ width: "398px", marginBottom: "40px" }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleLayersNumber}
        type="number"
        defaultValue={tableStateValues.layersData.length}
      />
      {layersNumber.map((layer, index) => (
        <>
          <p className={styles.configuration_title}>
            {`Layer Number ${layer + 1}`}
          </p>
          <Select
            key={layer}
            labelId="demo-select-small"
            id="values"
            onChange={(e) => handleChangeLayer(e, index)}
            value={layersInfo.length && layersInfo[index][1]}
            sx={{ width: "600px", marginBottom: "20px" }}
          >
            {LayersData.map(({ ModelName }) => (
              <MenuItem key={ModelName} value={ModelName}>
                {ModelName}
              </MenuItem>
            ))}
          </Select>
        </>
      ))}
      {!!tableStateValues.layersData.length && (
        <LayersTable tableData={tableStateValues.layersData} />
      )}
    </>
  );
};
