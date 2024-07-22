import { Request, Response } from "express";
import Bistro from "../../models/bistro";

async function getSingleBistro(req: Request, res: Response) {
  let bistro = await Bistro.findById(req.params.id)
    .lean()
    .select({ name: 1, location: 1, description: 1 })
    .exec();
  return res.status(200).json(bistro);
}

export default getSingleBistro;
