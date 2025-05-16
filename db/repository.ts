import { User } from "@/types";
import { db } from "./index";
import { usersTable } from "./schema/consumptionSchema";

async function insertData(): Promise<void> {
  try {
    console.log("Data invoegen starten...");
    await db.insert(usersTable).values([
      { name: "John", age: 13, email: "test" },
      { name: "John1", age: 22, email: "test2" },
    ]);
    console.log("Data succesvol ingevoegd!");
  } catch (error) {
    console.error("Fout bij invoegen:", error);
    throw error;
  }
}

async function testData(): Promise<User[]> {
  try {
    console.log("Data ophalen...");
    const data = await db.select().from(usersTable);
    console.log("Opgehaalde data:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Fout bij ophalen data:", error);
    throw error;
  }
}

export { insertData, testData };
