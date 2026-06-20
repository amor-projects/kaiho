import "dotenv/config";
import express from "express";
import cors from "cors";
import type { ApiResponse } from "@kaiho/types";
import { formatDate } from "@kaiho/utils";
import { db } from "@/db/client";
import { users } from "@/db/schema";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  const payload: ApiResponse<{ status: string; time: string }> = {
    success: true,
    data: { status: "ok", time: formatDate(new Date()) },
  };
  res.json(payload);
});

app.get("/api/users", async (_req, res) => {
  const allUsers = await db.select().from(users);
  res.json({ success: true, data: allUsers } satisfies ApiResponse<typeof allUsers>);
});

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));