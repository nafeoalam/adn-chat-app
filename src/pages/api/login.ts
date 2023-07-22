// pages/api/login.ts

import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const secretKey = "your-secret-key"; // Replace this with a secure secret key in production

// Dummy user data for demonstration purposes (replace with a real database in production)
const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // Find the user in the dummy data (replace with database queries in production)
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token and send it as the response
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
