import express from 'express';

const router = express.Router();

//test route
router.get('/', (req, res) => {
  res.status(200).send({
    message: 'Hello World!'
  });
});

router.get('/:name', (req, res) => {
  const name = req.params.name;
  res.status(200).send({
    message: `Hello ${name}!`
  });
});

export const testRoute = router;
