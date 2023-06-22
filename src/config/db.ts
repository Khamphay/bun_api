import { PrismaClient, Prisma } from "@prisma/client";

let client = new PrismaClient({ log: ["query", "info", "warn", "error"] });
client.$use(async (params, next) => {
  // if (client.model === "modelName") {//.......//}

  //TODO: If call 'create' or 'createMany' method set for insert 'createdAt' field
  if (params.action === "create") {
    params.args.data.createdAt = new Date(new Date(Date.now()));
  } else if (params.action === "createMany") {
    if (params.args.data !== undefined) {
      params.args.data["createdAt"] = new Date(Date.now());
    } else {
      params.args.createAt = new Date(Date.now());
    }
  }

  //TODO: If call 'update' or 'updateMany' method set for update 'updatedAt' field
  else if (params.action === "update") {
    params.args.data.updatedAt = new Date(Date.now());
  } else if (params.action === "updateMany") {
    if (params.args.data !== undefined) {
      params.args.data["updatedAt"] = new Date(Date.now());
    } else {
      params.args.data.updatedAt = new Date(Date.now());
    }
  }

  //TODO: If call 'delete' or 'deleteMany' method set for update 'isDeleted' and 'deleteDate' fields
  else if (params.action === "delete") {
    params.action = "update";
    params.args["data"] = {
      isDelete: true,
      updatedAt: new Date(Date.now())
    };
  } else if (params.action === "deleteMany") {
    params.action = "updateMany";
    if (params.args.data !== undefined) {
      params.args.data["isDelete"] = true;
      params.args.data["updatedAt"] = new Date(Date.now());
    } else {
      params.args["data"] = { isDelete: true, updatedAt: new Date(Date.now()) };
    }
  }
  return next(params);
});

export { client, Prisma };
