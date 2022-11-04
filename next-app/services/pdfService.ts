import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import PDFFooterIcon1 from "../public/icons/pdf-footer-icon-1.png";
import PDFFooterIcon2 from "../public/icons/pdf-footer-icon-2.png";
import PDFFooterIcon3 from "../public/icons/pdf-footer-icon-3.png";

enum Colors {
  headerTextColor = "#FFFFFF",
  tableHeader = "#418263",
  tableRows = "#F0FFF8",
}

type IncomingData = Array<Array<string | number> | number>;
type LampObjects = Record<string, Array<string | number>>;

interface IData {
  data: IncomingData;
  images: Record<string, string>;
  coil_installation: LampObjects;
  table3Percentile?: number;
  lamp_side_view: string;
  report_type: string;
}

interface ITable {
  head: string[][];
  body: string[][];
}

export const createOptimizeResultPDF = (data: IData) => {
  const doc = new jsPDF();

  if (!data) {
    return;
  }

  const optimizedPDFCreator = new OptimizedPDFCreator(doc, data);
  optimizedPDFCreator
    .createPage1()
    .createPage2()
    .createPage3()
    .createPage4()
    .createPage5()
    .createPage6();

  const now = new Date();

  doc.save(`${data.report_type}-${now.toUTCString()}`);
};

class OptimizedPDFCreator {
  doc: jsPDF;
  images: Record<string, string>;
  tables: ITable[];

  constructor(doc: jsPDF, data: IData) {
    this.doc = doc;
    this.images = { ...data.images, lamp_side_view: data.lamp_side_view };
    this.tables = this.createTables(data);
  }

  public createPage1() {
    this.doc.setTextColor(0, 58, 2);
    this.doc.setFontSize(24);
    this.doc.setFont(undefined, "bold");
    this.doc.text("ColiClean", 10, 8);

    this.addPDFTable(this.tables[0]);
    this.addPDFTable(this.tables[1]);

    this.addImagePDF("Coil Intensities", [30, 120, 150, 150]);

    this.addPDFFooter();
    const tablePerPage = 7;
    return this;
  }

  public createPage2() {
    this.doc.addPage();

    this.addImagePDF("Coil Intensities 3D", [30, 10, 150, 150]);

    this.addPDFFooter();
    return this;
  }

  public createPage3() {
    this.doc.addPage();

    this.addPDFTable(this.tables[2]);

    this.addImagePDF("Coil Intensities Distribution", [25, 55, 160, 115]);
    this.addImagePDF("Inactivation Time Distribution", [25, 153, 160, 115]);

    this.addPDFFooter();

    return this;
  }

  public createPage4() {
    this.doc.addPage();

    this.addImagePDF("Inactivation Time", [20, 10, 170, 170]);

    this.addPDFFooter();

    return this;
  }

  public createPage5() {
    this.doc.addPage();

    const tables = this.tables.slice(3);
    const tablePerPage = 7;

    tables.forEach((elem, index, array) => {
      if (index > 0 && index % tablePerPage === 0) this.doc.addPage();
      this.addPDFTable(elem);
      if ((index % tablePerPage) - 1 === 0 || index === array.length - 1)
        this.addPDFFooter();
    });

    if (tables.length % tablePerPage < 3)
      this.addImagePDF("Optimal Lamps Arrangement", [
        20,
        10 + (tables.length % 7) * 40,
        170,
        170,
      ]);
    else {
      this.doc.addPage();
      this.addImagePDF("Optimal Lamps Arrangement", [20, 20, 170, 170]);
      this.addPDFFooter();
    }

    this.addPDFFooter;
    return this;
  }

  public createPage6() {
    this.doc.addPage();

    this.addImagePDF("lamp_side_view", [20, 20, 170, 200]);

    this.addPDFFooter();

    return this;
  }

  private addImagePDF(name: string, sizes: [number, number, number, number]) {
    const img = new Image();
    img.src = "data:image/jpeg;base64, " + this.images[name];
    this.doc.addImage(img, "jpeg", ...sizes);
  }

  private addPDFFooter() {
    const footerIcon1 = new Image();
    footerIcon1.src = PDFFooterIcon1.src;
    this.doc.addImage(footerIcon1, "png", 89, 270, 8, 8);

    const footerIcon2 = new Image();
    footerIcon2.src = PDFFooterIcon2.src;
    this.doc.addImage(footerIcon2, "png", 103, 270, 8, 8);

    const footerIcon3 = new Image();
    footerIcon3.src = PDFFooterIcon3.src;
    this.doc.addImage(footerIcon3, "png", 115, 270, 8, 8);

    this.doc.setFontSize(6);
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFont(undefined, "italic");
    this.doc.text(
      "Disclaimer: Maecenas quam nunc, sagittis non condimentum at, rutrum sit amet eros. Fusce rutrum, lectus in blandit sagittis, mi tortor ullamcorper mi, vitae vestibulum\nlibero quam a nisi. In eu mauris et neque sodales porta eu eget dui. Nunc eu quam sit amet justo elementum mollis. Orci varius natoque penatibus et magnis dis parturient\nmontes, nascetur ridiculus mus.",
      18,
      283
    );
  }

  private addPDFTable(tableInfo: ITable) {
    autoTable(this.doc, {
      ...tableInfo,
      theme: "plain",
      headStyles: {
        fillColor: Colors.tableHeader,
        textColor: Colors.headerTextColor,
      },
      bodyStyles: {
        fillColor: Colors.tableRows,
      },
      margin: 10,
    });
  }

  private createTables(fullData: IData) {
    const { data } = fullData;
    const tables: ITable[] = [];

    tables.push({
      head: [["Dimensions and general information", "Value", "Measure"]],
      body: [
        ["Coil Width", data[0][0], "mm"],
        ["Coil Height", data[0][1], "mm"],
        ["Distance between lamp and coil", data[0][2], "mm"],
        ["Downstream/Upstream coefficient (1if Downstream)", data[0][3], ""],
        ["Number of lamp rows", data[1][2], ""],
        ["Number of lamp columns", data[1][1], ""],
        ["Number of lamps", data[0][4], ""],
        ["Total Input Power", data[0][5], "W"],
      ],
    });
    tables.push({
      head: [["Coil surface UV Irradiation Inte...", "Value", "Measure"]],
      body: [
        ["Minimum UV Irradiation Intensity", data[0][6], "W/cm2"],
        ["Average UV Irradiation Intensity", data[0][7], "W/cm2"],
        ["Maximum UV Irradiation Intensity", data[0][8], "W/cm2"],
      ],
    });
    const tablePercentile = fullData.table3Percentile
      ? fullData.table3Percentile + "%"
      : "-";
    tables.push({
      head: [["Survival time with disinfection", "Value", "Measure"]],
      body: [
        ["ASPERGILLUS NIGER", tablePercentile, "-"],
        ["Maximum", data[1][6], "min"],
        ["Average", data[1][5], "min"],
        ["Minimum", data[2] as number, "min"],
      ],
    });

    const splittedTables = [];

    Object.keys(fullData.coil_installation).reduce(
      (acc, curr, index, array) => {
        if (Object.keys(acc).length === 3) {
          splittedTables.push(acc);
          acc = { [curr]: fullData.coil_installation[curr] };
        } else {
          acc[curr] = fullData.coil_installation[curr];
          if (index === array.length - 1) splittedTables.push(acc);
        }
        return acc;
      },
      {}
    );

    splittedTables.forEach((elem) => {
      const keys = Object.keys(elem);
      tables.push({
        head: [["Installation", ...keys]],
        body: [
          ["Lamp Model", ...keys.map((e) => elem[e][0])],
          ["Lamp lower left en x , mm", ...keys.map((e) => elem[e][1])],
          ["Lamp lower left end y, mm", ...keys.map((e) => elem[e][2])],
        ],
      });
    });

    return tables;
  }
}
