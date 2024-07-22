import { Request, Response } from "express";
import Bistro from "../../models/bistro";

async function createBistro(req: Request, res: Response) {
  let { name, description, location } = req.body;
  try {
    let bistro = await Bistro.create({
      name,
      description,
      location,
    });
    return res.status(201).json(bistro);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error });
  }
}

export default createBistro;
