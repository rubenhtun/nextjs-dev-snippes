import express from "express";

const clientPageRouter = express.Router();

// if user is serach for localhost:4000/client-page
clientPageRouter.get("/client-page", (req, res) => {
  console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    return res.status(200).json([
      {
        id: "1",
        name: "John Doe",
        email: "johndoe.dev@gmail.com",
        phone: "(555) 123-4567",
        company: "Tech Corp",
        status: "Active",
        lastContact: "2025-01-15",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "janesmith.dev@gmail.com",
        phone: "(555) 987-6543",
        company: "Design Co",
        status: "Active",
        lastContact: "2025-01-20",
      },
    ]);
  }
});

export default clientPageRouter;
