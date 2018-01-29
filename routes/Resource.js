const express = require('express');
const router = express.Router();

const resource_controller = require('../controllers/Resource');

console.log(resource_controller.full_list)
// GET catalog home page.
router.get('/', resource_controller.full_list);

// POST request for creating Book.
router.post('/create', resource_controller.create);

// GET request to delete Book.
router.get('/:id', resource_controller.find_by_id);

// // POST request to delete Book.
// router.post('/:id/delete', resource_controller.book_delete_post);
//
// // GET request to update Book.
// router.get('/:id/update', resource_controller.book_update_get);
//
// // POST request to update Book.
// router.post('/:id/update', resource_controller.book_update_post);
//
// // GET request for one Book.
// router.get('/:id', resource_controller.book_detail);

module.exports = router;
