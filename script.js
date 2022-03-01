import lodash from "lodash";
import { Low, JSONFile } from "lowdb";

// Extend Low class with a new `chain` field
class LowWithLodash extends Low {
  chain = lodash.chain(this).get("data");
}

const adapter = new JSONFile("db.json");
const db = new LowWithLodash(adapter);
await db.read();

const lowdb = db.chain
  .get("topics")
  .find({ title: "lowdb", author: 1 })
  .value();
console.log(lowdb);
