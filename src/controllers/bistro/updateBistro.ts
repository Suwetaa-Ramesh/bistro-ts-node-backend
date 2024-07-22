import { Request, Response } from "express";
import Bistro from "../../models/bistro";

async function updateBistro(req: Request, res: Response) {
  let { name, description, location } = req.body;
  try {
    let bistro = await Bistro.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        location,
      },
      { new: true }
    );
    return res.status(200).json(bistro);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error });
  }
}

export default updateBistro;
