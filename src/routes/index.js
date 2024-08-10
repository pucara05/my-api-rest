import express from 'express';
import {
  getItems,getItemById,createItem,updateItem,deleteItem
} from '../controllers/itemController.js'; // Asegúrate de usar el nombre correcto del archivo


const router = express.Router();

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Retrieve a list of items
 *     description: Fetches a list of items from the database. Each item contains an id and a name.
 *     responses:
 *       200:
 *         description: A list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *             example:
 *               - id: 1
 *                 name: "Item One"
 *               - id: 2
 *                 name: "Item Two"
 *       500:
 *         description: Internal server error
 */
router.get('/items', getItems);


/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Retrieve an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: An item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       404:
 *         description: Item not found
 */
  router.get('/items/:id', getItemById);

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 */
  router.post('/items', createItem);

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update an existing item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       404:
 *         description: Item not found
 */
 router.put('/items/:id', updateItem);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete an item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Item deleted
 *       404:
 *         description: Item not found
 */
  router.delete('/items/:id', deleteItem);

export default router;
