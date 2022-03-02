import lodash from "lodash";
import { Low, JSONFile } from "lowdb";

// Extend Low class with a new `chain` field
class LowWithLodash extends Low {
  chain = lodash.chain(this).get("data");
}

const adapter = new JSONFile("db.json");
const db = new LowWithLodash(adapter);
await db.read();

// // If file.json doesn't exist, db.data will be null
// // Set default data
// db.data = db.data || { authors: [], topics: [] }; // Node < v15.x

// const { authors } = db.data;

// authors.push({
//   id: 1,
//   name: "Nayeon",
//   title: "Aspiring back-end developer",
// });

// const { topics } = db.data;

// topics.push({
//   id: 1,
//   title: "lowdb",
//   description: "lowdb is a simple-to-use local JSON database.",
//   author: 1,
// });

// topics.push({
//   id: 2,
//   title: "MySQL",
//   description: "MySQL is an open-source relational database management system.",
//   author: 1,
// });

// // Finally write db.data content to file
// await db.write();

const lowdb = db.chain
  .get("topics")
  .find({ title: "lowdb", author: 1 })
  .value();
console.log(lowdb);

db.chain
  .get("topics")
  .find({ id: 2 })
  .assign({
    title: "MySQL & MariaDB",
    description:
      "MySQL is an open-source relational database management system. MariaDB is a community-developed, commercially supported fork of the MySQL relational database management system.",
  })
  .value();

await db.write();
