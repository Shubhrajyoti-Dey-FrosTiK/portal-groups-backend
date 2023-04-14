import express, { Request } from "express";

/*-------- Model --------*/
import { GroupModel, Group } from "../models/Group.model";

/*------- Dependencies -------*/
import { DatabaseService } from "../services/database/database.service";

import { ResponseDto } from "../dto/response.dto";

/*-------- Initialization--------*/
const router = express.Router();
const db = new DatabaseService();

/*-------- Dto --------*/

interface GetGroup {
  headers: {
    groupid: string;
  };
}

interface CreateGroup {
  body: Group;
}

interface UpdateGroup extends GetGroup {
  body: {
    roles: Array<String>;
  };
}
/*-------- Methods --------*/

const getGroup = async (request: GetGroup): Promise<ResponseDto> => {
  try {
    const group = await db.findOne(GroupModel, {
      _id: request.headers.groupid,
    });
    return {
      data: group,
    };
  } catch (error: any) {
    return { error: error.message };
  }
};

const createGroup = async (request: CreateGroup): Promise<ResponseDto> => {
  try {
    const group = await db.create(GroupModel, request.body);
    return {
      data: group,
    };
  } catch (error: any) {
    return { error: error.message };
  }
};

const updateGroup = async (request: UpdateGroup): Promise<ResponseDto> => {
  try {
    const group = await db.findOneAndUpdate(
      GroupModel,
      {
        _id: request.headers.groupid,
      },
      { $addToSet: { roles: { $each: request.body.roles } } },
      { new: true }
    );
    return {
      data: group,
    };
  } catch (error: any) {
    return { error: error.message };
  }
};

const deleteGroup = async (request: GetGroup): Promise<ResponseDto> => {
  try {
    await GroupModel.findOneAndRemove({
      _id: request.headers.groupid,
    });
    return {
      message: "SUCCESS",
    };
  } catch (error: any) {
    return { error: error.message };
  }
};

/*-------- Routes --------*/

router.get("/id", async (request: GetGroup, response: any) => {
  const group: ResponseDto = await getGroup(request);
  response.send(group);
});

router.post("/", async (request: CreateGroup, response: any) => {
  const group: ResponseDto = await createGroup(request);
  response.send(group);
});

router.put("/id", async (request: UpdateGroup, response: any) => {
  const group: ResponseDto = await updateGroup(request);
  response.send(group);
});

router.delete("/id", async (request: UpdateGroup, response: any) => {
  const group: ResponseDto = await deleteGroup(request);
  response.send(group);
});
export default router;
