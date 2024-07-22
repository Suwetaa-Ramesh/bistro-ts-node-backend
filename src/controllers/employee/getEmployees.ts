import { Request, Response } from "express";
import Employee from "../../models/employee";
import { IBistro } from "../../models/bistro";
import dayjs from "dayjs";

async function getEmployees(req: Request, res: Response) {
  let filter = req.query.bistro ? { bistro: req.query.bistro } : {};
  let employees = await Employee.find(filter)
    .lean()
    .populate<{ bistro: IBistro }>({
      path: "bistro",
      select: {
        name: 1,
      },
    })
    .exec();

  let data = employees.map((employee) => {
    let startDate = dayjs(employee.createdAt);
    let currentDate = dayjs();
    let difference = currentDate.diff(startDate, "day");
    return {
      ...employee,
      days_worked: difference,
      bistro: employee?.bistro?.name,
    };
  });
  return res.status(200).json(data);
}

export default getEmployees;
