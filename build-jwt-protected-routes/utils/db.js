
import path from "path";
import fs from "fs";

const FILE = path.join(import.meta.dirname, "../data/users.json");

export function readUsers() {
  const data = fs.readFileSync(FILE, "utf8").trim();

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

export function writeUsers(users) {
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2), "utf8");
}

export function findByEmail(email) {
  return readUsers().find((u) => u.email === email) || null;
}

export function findById(id) {
  return readUsers().find((u) => u.id === id) || null;
}
