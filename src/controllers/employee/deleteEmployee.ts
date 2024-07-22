import { Request, Response } from "express";
import Bistro from "../../models/bistro";
import Employee from "../../models/employee";

async function deleteEmployee(req: Request, res: Response) {
  try {
    let deleteEmployeePromise = Employee.findByIdAndDelete(
      req.params.id
    ).exec();
    let removeFromBistroPromise = Bistro.updateOne(
      {
        employees: req.params.id,
      },
      { $pull: { employees: req.params.id } }
    );
    await Promise.all([deleteEmployeePromise, removeFromBistroPromise]);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
}

export default deleteEmployee;
