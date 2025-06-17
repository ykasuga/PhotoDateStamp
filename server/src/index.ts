import express, { Request, Response } from 'express';

const app = express();
const port = 5001;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
