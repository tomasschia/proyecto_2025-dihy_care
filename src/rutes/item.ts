import { Router, Request, Response } from "express";

const router = Router();

//entries
router.post('/entries', (req: Request, res: Response) => {
  const data = req.body;
  console.log("Datos recibidos:", data);


  res.json({ status: "ok", received: data });
});

//treatments
router.post('/treatments', (req: Request, res: Response) => {
  const data = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ error: "Se esperaba un array de tratamientos" });
  }

  console.log("Treatments recibidos:");
  data.forEach((item, i) => {
    console.log(`Treatment #${i + 1}:`, item);
  });

  res.json({ status: "ok", count: data.length });
});

//status
router.post("/entries/devicestatus", (req: Request, res: Response) => {
  const data = req.body;
  console.log("Devicestatus recibido:", data);
  res.json({ status: "ok", message: "Devicestatus procesado", received: data });
});




export default router;