import { client } from "../config/db";
import { calculPage } from "../config/func";
import { CRUDModel } from "../interface/CRUD";

export interface Stocks {
  id: number | null;
  merchantId: number | null;
  productName: string | null;
  qty: number | null;
  price: number | null;
  discretion?: string | null;
  isDelete?: boolean | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export class StockModel implements Stocks, CRUDModel {
  id: number | null;
  merchantId: number | null;
  productName: string | null;
  qty: number | null;
  price: number | null;
  discretion?: string | null;
  createdBy: string | null;
  updatedBy: string | null;

  constructor(data?: Stocks | null) {
    this.id = data?.id ?? null;
    this.merchantId = data?.merchantId ?? null;
    this.productName = data?.productName ?? null;
    this.qty = data?.qty ?? 0;
    this.price = data?.price ?? 0;
    this.discretion = data?.discretion ?? null;
    this.createdBy = data?.createdBy ?? null;
    this.updatedBy = data?.updatedBy ?? null;
  }

  public async getAllData(
    page: any,
    perPage: any,
    totalPages: number
  ): Promise<any> {
    try {
      if (totalPages == undefined) {
        const total = await client.stocks.count({
          where: { merchantId: this.merchantId!, isDelete: false }
        });

        totalPages = calculPage(total, perPage);
      }
      const products = await client.stocks.findMany({
        skip: ((page ?? 1) - 1) * (perPage ?? 0),
        take: perPage,
        where: { merchantId: this.merchantId!, isDelete: false }
      });
      return { page, perPage, totalPages, products };
    } catch (error) {
      throw error as Error;
    }
  }

  public async getOneDataByID(id: any): Promise<Stocks | null | Error> {
    try {
      const product = await client.stocks.findUnique({
        where: {
          findOne: { id: id, merchantId: this.merchantId!, isDelete: false }
        }
      });
      return product;
    } catch (error) {
      throw error as Error;
    }
  }
  public async createData(): Promise<Stocks | Error> {
    try {
      const product = await client.stocks.create({
        data: {
          productName: this.productName!,
          merchantId: this.merchantId!,
          qty: this.qty!,
          price: this.price!,
          discretion: this.discretion,
          createdBy: this.createdBy!
        }
      });
      return product;
    } catch (error) {
      throw error as Error;
    }
  }
  public async updateData(id: number): Promise<Stocks | null | Error> {
    try {
      const check = await client.stocks.findUnique({
        where: {
          findOne: { id: id, merchantId: this.merchantId!, isDelete: false }
        }
      });
      if (check === null) return null;
      const product = await client.stocks.update({
        data: {
          productName: this.productName ?? check.productName,
          qty: this.qty ?? check.qty,
          price: this.price ?? check.price,
          discretion: this.discretion ?? check.discretion,
          updatedBy: this.updatedBy
        },
        where: { id: id }
      });
      return product;
    } catch (error) {
      throw error as Error;
    }
  }
  public async deleteData(id: number): Promise<Stocks | null | Error> {
    try {
      const check = await client.stocks.findUnique({
        where: {
          findOne: { id: id, merchantId: this.merchantId!, isDelete: false }
        }
      });
      if (check === null) return null;
      const product = await client.stocks.delete({
        where: { id: id }
      });
      return product;
    } catch (error) {
      throw error as Error;
    }
  }
}
