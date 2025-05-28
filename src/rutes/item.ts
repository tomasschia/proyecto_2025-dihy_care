import { Router, Request, Response } from "express";

const router = Router();


router.post('/entries', (req: Request, res: Response) => {
  const data = req.body;
  console.log("Datos recibidos desde xDrip:", data);


  res.json({ status: "ok", received: data });
});

export default router;