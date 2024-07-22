import express from "express";
const bistroRouter = express.Router();

import {
  getBistros,
  getSingleBistro,
  createBistro,
  updateBistro,
  deleteBistro,
} from "../controllers/bistro";

bistroRouter.get("/", getBistros);

bistroRouter.post("/", createBistro);

bistroRouter.get("/:id", getSingleBistro);

bistroRouter.put("/:id", updateBistro);

bistroRouter.delete("/:id", deleteBistro);

export default bistroRouter;
