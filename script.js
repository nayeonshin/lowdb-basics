import lodash from "lodash";
import { Low, JSONFile } from "lowdb";

import { nanoid } from "nanoid";

// Extend Low class with a new `chain` field
class LowWithLodash extends Low {
  chain = lodash.chain(this).get("data");
}

const adapter = new JSONFile("db.json");
const db = new LowWithLodash(adapter);
await db.read();

// If file.json doesn't exist, db.data will be null
// Set default data
db.data = db.data || { author: [], topic: [] }; // Node < v15.x

const { author } = db.data;
const { topic } = db.data;

/* ----------------------------- Create ----------------------------- */

author.push({
  id: 1,
  name: "Nayeon",
  title: "Aspiring back-end developer",
});

topic.push({
  id: 1,
  title: "lowdb",
  description: "lowdb is a simple-to-use local JSON database.",
  author: 1,
});

topic.push({
  id: 2,
  title: "MySQL",
  description: "MySQL is an open-source relational database management system.",
  author: 1,
});

// Finally write db.data content to file
await db.write();

/* ------------------------------ Read ------------------------------ */
const lowdb = db.chain.get("topic").find({ title: "lowdb", author: 1 }).value();
console.log(lowdb);

/* ----------------------------- Update ----------------------------- */
db.chain
  .get("topic")
  .find({ id: 2 })
  .assign({
    title: "MySQL & MariaDB",
    description:
      "MySQL is an open-source relational database management system. MariaDB is a community-developed, commercially supported fork of the MySQL relational database management system.",
  })
  .value();
await db.write();

/* ----------------------------- Delete ----------------------------- */
db.chain.get("topic").remove({ id: 2 }).value();
await db.write();

/* --------------------------- Random ids --------------------------- */
const nanoId = nanoid();
author.push({
  id: nanoId,
  name: "Nayoni",
  title: "Nayeon's clone",
});

topic.push({
  id: nanoid(),
  title: "PostgreSQL",
  description:
    "PostgreSQL is a free and open-source relational database management system emphasizing extensibility and SQL compliance.",
  author: nanoId,
});

await db.write();
