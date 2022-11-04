export interface IImages {
  coil_installation: {
    [key: string]: string | number;
  };
  data: Array<number[] | Array<number | string> | number>;
  images: {
    [key: string]: string;
  };
  lamp_side_view: string;
}

export default interface ImagesProps {
  images: IImages;
  isLoading: boolean;
  requiredInactivationRate: number;
  tableValues: Array<number | string | { name: string; sum: number }[]>;
  reportType: string;
  tableStateValues: object;
}
