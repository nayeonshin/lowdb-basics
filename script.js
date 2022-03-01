import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Read data from JSON file, this will set db.data content
await db.read();

// If file.json doesn't exist, db.data will be null
// Set default data
db.data = db.data || { authors: [], topics: [] }; // Node < v15.x

const { authors } = db.data;

authors.push({
  id: 1,
  name: "Nayeon",
  title: "Aspiring back-end developer",
});

const { topics } = db.data;

topics.push({
  id: 1,
  title: "lowdb",
  description: "lowdb is a simple-to-use local JSON database.",
  author: 1,
});

topics.push({
  id: 2,
  title: "MySQL",
  description: "MySQL is an open-source relational database management system.",
  author: 1,
});

// Finally write db.data content to file
await db.write();
