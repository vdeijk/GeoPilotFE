import { DropdownFieldModel } from "../interfaces/DropdownFieldModel";
import { DateFieldModel } from "../interfaces/DateFieldModel";
import { TableHeaderModel } from "../interfaces/TableHeaderModel";
import { InputFieldModel } from "../interfaces/InputFieldModel";

class DocumentsData {
  public tableHeaders: TableHeaderModel<any>[] = [];
  public textFieldsString: Record<string, InputFieldModel> = {};
  public textFieldsNumber: Record<string, InputFieldModel> = {};
  public dropdowns: Record<string, DropdownFieldModel> = {};
  public dateFields: DateFieldModel[] = [];

  constructor() {
    this.initializeTableHeaders();
    this.initializeTextFields();
    this.initializeDropdowns();
    this.initializeDateFields();
  }
  private initializeTableHeaders() {
    this.tableHeaders = [
      {
        id: "active",
        label: "Active",
        sortable: false,
        type: "boolean",
      },
      {
        id: "title",
        label: "Document Name",
        sortable: true,
        type: "string",
      },
      {
        id: "uploadedAt",
        label: "Uploaded At",
        sortable: true,
        type: "date",
      },
      {
        id: "status",
        label: "Status",
        sortable: true,
        type: "string",
      },
    ];
  }

  private initializeTextFields() {
    this.textFieldsString = {
      title: {
        key: "title",
        label: "Search",
        defaultValue: "",
        placeholder: "Search documents...",
        maxLength: 20,
      },
    };
  }

  private initializeDropdowns() {
    this.dropdowns = {
      status: {
        key: "status",
        label: "Status",
        options: () => [
          { label: "All", value: "" },
          { label: "Processed", value: "Processed" },
          { label: "Pending", value: "Pending" },
        ],
        defaultValue: "Select status...",
      },
    };
  }

  private initializeDateFields() {
    this.dateFields = [
      {
        key: "minDate",
        label: "Uploaded After",
        defaultValue: "",
      },
      {
        key: "maxDate",
        label: "Uploaded Before",
        defaultValue: "",
      },
    ];
  }
}

const documentsdata = new DocumentsData();
export default documentsdata;
