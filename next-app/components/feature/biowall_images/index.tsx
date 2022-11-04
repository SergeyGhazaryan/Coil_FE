import { useState, useEffect } from "react";
import { CircularProgress, Divider } from "@mui/material";;
import { DataTable } from "components/shared/dataTable";
import imageType from "constants/image_type";
import Image from "components/shared/image/images";
import { OptimizationTarget as target } from "../../../components/shared/optimizationTarget/types";
import { MicroOrganismsTable } from '../../shared/microorganizmsTable/index';
import ImagesProps from "./types";

import styles from "../images/images.module.scss";

interface TableStatesArr {
  name: string;
  calories: number;
  fat: string;
}

const getCoilWidth = (CoilWidthForm, apiImages) => {
  if (!Object.values(apiImages).length)
    return CoilWidthForm;
  CoilWidthForm[0].calories = apiImages["data"][0][0];
  CoilWidthForm[1].calories = apiImages["data"][0][1];
  CoilWidthForm[2].calories = apiImages["data"][0][2];
  CoilWidthForm[3].calories = apiImages["data"][0][3];
  CoilWidthForm[4].calories = apiImages["data"][1][2];
  CoilWidthForm[5].calories = apiImages["data"][1][1];
  CoilWidthForm[6].calories = apiImages["data"][0][4];
  CoilWidthForm[7].calories = apiImages["data"][0][5];
  return CoilWidthForm;
};

const getMinimumUV = (uv_form, apiImages) => {
  if (!Object.values(apiImages).length)
    return uv_form;
  uv_form[0].calories = apiImages["data"][0][6];
  uv_form[1].calories = apiImages["data"][0][7];
  uv_form[2].calories = apiImages["data"][0][8];
  return uv_form;
};

const getAspergillus = (
  aspergillusForm,
  apiImages,
  required_inactivation_rate
) => {
  if (!Object.values(apiImages).length)
    return aspergillusForm;
  aspergillusForm[0].calories = required_inactivation_rate + "%" ?? "-";
  aspergillusForm[1].calories = apiImages["data"][1][6];
  aspergillusForm[2].calories = apiImages["data"][1][5];
  aspergillusForm[3].calories = apiImages["data"][2];
  return aspergillusForm;
};

const BiowallImages = ({
  images,
  tableValues,
  tableStateValues,
  isLoading,
  requiredInactivationRate,
}: ImagesProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [commonInfo, setCommonInfo] = useState([])
  const [graphs, setGraphs] = useState({})
  const [installData,setInstallData] = useState([])
  const [inactivationDoses, setInactivationDoses] = useState([])
  const [allInactivationDoses , setAllInactivationDoses] = useState([])
  const [inactivationRate, setInactivationRate] = useState([])
  const [model, setModel] = useState("ModelName")

  useEffect(()=>{
    setCommonInfo([
        {
            name:"Duct Width (x)",
            calories:tableValues[0],
            fat:"mm"
        },
        {
            name:"Duct Height (y)",
            calories:tableValues[1],
            fat:"mm"
        },
        {
            name:"Duct Length (z)",
            calories:tableValues[2],
            fat:"mm"
        },
        {
            name:"Duct Walls Reflection Coefficient",
            calories:tableValues[3],
            fat:""
        },
        {
            name:"Airflow",
            calories:tableValues[4],
            fat:"CFM"
        },
        {
            name:"Number of Layers",
            calories:tableValues[5].length,
            fat:""
        },
        {
            name:"Total Numbers of Lamps",
            calories:images.tables_data.total_number_of_lamps,
            fat:""
        },
        {
            name:"Total Input Power",
            calories:images.tables_data.total_input_power,
            fat:"W"
        },
        {
          name:"Total Price",
          calories:images.tables_data.total_cost,
          fat:"S"
        }
    ])
    setInactivationDoses([
      {
        name:"min",
        calories:images.tables_data.single_pass_interval[0],
        fat:"mW/cm²"
      },
      {
        name:"avg",
        calories:images.tables_data.single_pass_interval[1],
        fat:"mW/cm²"
      },
      {
        name:"max",
        calories:images.tables_data.single_pass_interval[2],
        fat:"mW/cm²"
      }
      
    ])

    setAllInactivationDoses([
      {
        name:"min",
        calories:images.tables_data.all_passes_interval[0],
        fat:"mW/cm²"
      },
      {
        name:"avg",
        calories:images.tables_data.all_passes_interval[1],
        fat:"mW/cm²"
      },
      {
        name:"max",
        calories:images.tables_data.all_passes_interval[2],
        fat:"mW/cm²"
      }
    ])

    setGraphs({
        lamps_locations_layers:images.graphs[0]["lamps_locations_layers"][0].Layer_0_locations_layers,
        Layer_1_int_figures:images.graphs[1][0]["Layer_1_int_figures"].Duct_Irradiation_Dose_Distribution_Layer,
        Layer_2_int_figures:images.graphs[1][0]["Layer_1_int_figures"].Duct_Irradiation_Dose_Layer,
        Inactivation_Factor_image_arr:images.graphs[2]["Inactivation_Factor_image_arr"][0].distribution_figure,
    })
    if(tableValues[9].length==0){
    setInstallData(tableValues[5])
    setModel("Model_Name")
    }
    else[
      setInstallData(tableValues[9])

    ]
    setInactivationRate(tableValues[6])
    setLoading(false)
  },[])


  const returnImages = (key: string): JSX.Element => {

    return (
      <>
        {loading ? (
          <div className={styles.loading}>
            <CircularProgress />
          </div>
        ) : (
          <>
            {(
              <Image
                id="images"
                className={styles.images}
                src={`${imageType},${graphs[key]}`}
                width={500}
                height={600}
                alt="img"
              />
            )}
          </>
        )}
      </>
    );
  };


  return (
    <>
  { !loading ?
     <div className={styles.reportsContainer}>
      <h2 className={styles.heading}>BioWall Result</h2>
      <p>Common Information</p>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <DataTable
              className={styles.firstColumn}
              data={commonInfo}
              width={650}
              tableName="Parameter Name"
              firstArgument="Value"
              secondArgument="Measure"
            />
            {commonInfo.length > 0 && <Divider />}
          </div>
        </div>
        <div className={`${styles.column} ${styles.flex_center}`}>
               {returnImages("Layer_2_int_figures")}
        </div>
        <Divider />
        <h2 className={styles.heading}>Installation Data</h2>
        <div className={styles.row}>
          <div className={styles.column}>
            <DataTable
              className={styles.firstColumn}
              data={installData}
              width={650}
              tableName="Model Name"
              firstArgument="Number of columns"
              secondArgument="Number of Rows"
              rowThree="Number_of_Columns"
              rowTwo="Number_of_Rows"
              rowOne={model}
            />
            {installData.length > 0 && <Divider />}
          </div>
        </div>
        <h2 className={styles.heading}>Inactivation Doses</h2>
        <div className={styles.row}>
          <div className={styles.column}>
            <DataTable
               className={styles.firstColumn}
               data={inactivationDoses}
               width={650}
               tableName="Single Pass UVC Dose"
               firstArgument="Value"
               secondArgument="Measure"
            />
            {installData.length > 0 && <Divider />}

            <DataTable
              className={styles.firstColumn}
              data={allInactivationDoses}
              width={650}
              tableName={`UVC Dose after ${allInactivationDoses.length} Passes`}
              firstArgument="Value"
              secondArgument="Measure"
            />
            {allInactivationDoses.length > 0 && <Divider />}
            <h2 className={styles.heading}>Inactivation Rate After {allInactivationDoses.length} Passes</h2>
            <MicroOrganismsTable
              className={styles.firstColumn}
              data={tableValues[6].map(value => value.name)}
              inactivationRate={images.tables_data.inactivation_data}
              width={650}
              tableName="Microorganisms"
              firstArgument="Inactivation probability,%"
              secondArgument="Inactivation rate"
            />
             {allInactivationDoses.length > 0 && <Divider />}
          </div>
        </div>
        <div className={`${styles.column} ${styles.flex_center}`}>
               {returnImages("Layer_1_int_figures")}
        </div>
        
      </div>
    </div> :
    <CircularProgress/>
}
    </>
  );
};
export default BiowallImages;
