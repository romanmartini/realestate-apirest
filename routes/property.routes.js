const { getAllProperty, getProperty, postProperty, putProperty, delProperty } = require('../controllers/property.controllers');
const router = require('express').Router();

router.get('/', getAllProperty);
router.get('/:_id', getProperty);
router.post('/', postProperty);
router.put('/:_id', putProperty);
router.delete('/:_id', delProperty);

module.exports = router;
