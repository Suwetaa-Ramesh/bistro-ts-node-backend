import { Request, Response } from "express";

import Employee from "../../models/employee";
import Bistro from "../../models/bistro";

async function deleteBistro(req: Request, res: Response) {
  try {
    let deleteBistroPromise = Bistro.findByIdAndDelete(req.params.id).exec();
    let deleteEmployeesPromise = Employee.deleteMany({
      bistro: req.params.id,
    }).exec();
    await Promise.all([deleteBistroPromise, deleteEmployeesPromise]);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
}

export default deleteBistro;
