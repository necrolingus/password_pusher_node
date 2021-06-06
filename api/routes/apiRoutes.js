module.exports = app => {
  const router = require("express").Router();
  const passwordController = require("../controllers/passwordController");
  
  router.post('/password', passwordController.insertOne)
  router.get('/:uniqueId', passwordController.selectOne)
  router.delete('/:uniqueId', passwordController.deleteOne)

  app.use('/api', router);
}
