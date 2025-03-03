import { connectToMongoDB } from "./index";
import Bistro from "../models/bistro";
import Counter from "../models/counter";
import Employee from "../models/employee";
import { faker } from "@faker-js/faker";

let seedBistroCountryCodes = ["SG", "US"];

type SeedBistro = {
  name: string;
  description: string;
  location: string;
};
type SeedEmployee = {
  name: string;
  email_address: string;
  phone_number: string;
  gender: string;
  bistro: string;
};

const clearExistingCollections = async () => {
  await Counter.deleteMany({});
  await Bistro.deleteMany({});
  await Employee.deleteMany({});
};

const seedCounter = async () => {
  await Counter.create({ name: "employee", seqValue: 1000000 });
};

const seedBistros = async () => {
  let bistros: SeedBistro[] = [];
  seedBistroCountryCodes.forEach((countryCode, i) => {
    for (let j = 1; j <= 5; j++) {
      let n = i * 5 + j;
      bistros.push({
        name: `BistroName${n}`,
        description: faker.lorem.sentences(2),
        location: countryCode,
      });
    }
  });
  return Bistro.insertMany(bistros);
};

const seedEmployees = async () => {
  let bistros = await Bistro.find({});

  let employees: SeedEmployee[] = [];

  bistros.forEach((bistro) => {
    // create between 1 to 5 employees for each bistro
    let numEmployees = Math.floor(Math.random() * 5) + 1;
    for (let i = 1; i <= numEmployees; i++) {
      let phoneNumber = Math.floor(Math.random() * 10000000) + 80000000;
      let gender = Math.floor(Math.random() * 2) ? "Male" : "Female";
      let employee = {
        name: `EName${i}`,
        email_address: faker.internet.email(),
        phone_number: phoneNumber.toString(),
        gender,
        bistro: bistro.id,
      };
      employees.push(employee);
    }
  });

  await Promise.all(
    employees.map(async (employee) => {
      let employeeIdCounter = await Counter.findOneAndUpdate(
        { name: "employee" },
        { $inc: { seqValue: 1 } },
        { new: true }
      );
      if (!employeeIdCounter) throw new Error("Employee ID counter not found");

      let employeeId = `UI${employeeIdCounter.seqValue}`;
      let createdEmployee = await Employee.create({
        ...employee,
        id: employeeId,
      });
      return Bistro.findByIdAndUpdate(employee.bistro, {
        $push: { employees: createdEmployee._id },
        $inc: { numEmployees: 1 },
      });
    })
  );
};

async function start() {
  try {
    await connectToMongoDB();
    await clearExistingCollections();
    await seedCounter();
    await seedBistros();
    await seedEmployees();
    console.info("Seeding completed, you can kill process now");
  } catch (error) {
    console.error(error);
  }
}

start().catch((error) => console.error(error));
