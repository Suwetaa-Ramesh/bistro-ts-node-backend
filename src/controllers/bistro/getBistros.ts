import { Request, Response } from "express";
import Bistro from "../../models/bistro";

async function getBistros(req: Request, res: Response) {
  let filter = req.query.location ? { location: req.query.location } : {};

  let bistros = await Bistro.find(filter)
    .lean()
    .sort({ numEmployees: -1 })
    .exec();

  return res.status(200).json(
    bistros.map((bistro: { numEmployees: any }) => {
      return {
        ...bistro,
        employees: bistro.numEmployees,
      };
    })
  );
}

export default getBistros;
