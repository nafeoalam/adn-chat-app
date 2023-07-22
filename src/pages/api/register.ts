// pages/api/register.ts

import { NextApiRequest, NextApiResponse } from "next";

interface RegisterData {
  username: string;
  password: string;
}

const users: RegisterData[] = []; // Store registered users (In-memory, replace with a real database in production)

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, password } = req.body as RegisterData;

    // Check if the user already exists
    if (users.find((user) => user.username === username)) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Store the user in the "database"
    users.push({ username, password });
    res.status(201).json({ message: "Registration successful" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
