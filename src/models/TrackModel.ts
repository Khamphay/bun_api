import { tracks_shippingStatus } from ".prisma/client";
import { Bills } from "./BillModel";

export interface Tracks {
  id: number | null;
  tackingNo: string | null;
  billId: number | null;
  branchId?: number | null;
  merchantId?: number | null;
  senderName: string | null;
  senderTel: string | null;
  senderAddress: string | null;
  rceiverName?: string | null;
  receiverTel: string | null;
  shippingStatus: tracks_shippingStatus | null;
  isDelete?: boolean | null;
  createdBy: string | null;
  updatedBy?: string | null;
  createdAt: Date | null;
  updatedAt?: Date | null;
  trackdetails?: TrackDetails[] | null;
  bills?: Bills | null;
}

export interface TrackDetails {
  id: number | null;
  trackId: number | null;
  statusId: number | null;
  uid: string | null;
  isDelete?: boolean | null;
  createdBy: string | null;
  updatedBy?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}


