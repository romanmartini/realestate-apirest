const { getAllEstate, getEstate, postEstate, putEstate, delEstate } = require('../controllers/estate.controllers');
const router = require('express').Router();

router.get('/', getAllEstate);
router.get('/:_id', getEstate);
router.post('/', postEstate);
router.put('/:_id', putEstate);
router.delete('/:_id', delEstate);

module.exports = router;