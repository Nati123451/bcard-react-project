// src/server.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const port = 5000;
const secret = 'your_jwt_secret';

app.use(cors());
app.use(bodyParser.json());

// Token endpoint
app.post('/token', (req: Request, res: Response) => {
  const user = req.body;
  const token = jwt.sign(user, secret, { expiresIn: '1h' });
  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
