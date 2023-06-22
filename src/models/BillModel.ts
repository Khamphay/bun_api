import {
  billdetails_CDCStatus,
  billdetails_CODStatus,
  billdetails_shippingStatus
} from "@prisma/client";
import { Employees } from "./EmployeeModel";
import { Status } from "./StatusModel";
import { Tracks } from "./TrackModel";
import { Units } from "./UnitModel";

export interface Bills {
  id: number | null;
  trackId: number | null;
  statusId: number | null;
  uid: string | null;
  isDelete?: boolean | null;
  createdBy: string | null;
  updatedBy?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  tracks?: Tracks | null;
  status?: Status | null;
  billdetails: BillDetails[] | null;
  employees?: Employees | null;
}

export interface BillDetails {
  id: number | null;
  billId: number | null;
  unitId: number | null;
  productId?: number | null;
  weigth: number | null;
  COD: number | null;
  CODStatus: billdetails_CODStatus | null;
  CDCPrice: number | null;
  CDCStatus: billdetails_CDCStatus | null;
  shippingStatus: billdetails_shippingStatus | null;
  isDelete?: boolean | null;
  createdBy: string | null;
  updatedBy?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  units?: Units | null;
}
