import express from 'express';
import { createUsuario, getUsuarios, getUsuarioById, updateUsuario, deleteUsuario } from '../controllers/itemController.js'; // Asegúrate de que la ruta sea correcta

/*
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem, 
} from '../controllers/itemController.js'; // Asegúrate de usar el nombre correcto del archivo  */


const router = express.Router();

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Retrieve a list of items
 *     description: Fetches a list of items from the database. Each item contains an id, name, and email.
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
 *                   nombre:
 *                     type: string
 *                   correo:
 *                     type: string
 *             example:
 *               - id: 1
 *                 name: "John Doe"
 *                 email: "john.doe@example.com"
 *               - id: 2
 *                 name: "Jane Doe"
 *                 email: "jane.doe@example.com"
 *       500:
 *         description: Internal server error
 */
router.get('/usuarios', getUsuarios);


/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Create a new item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *             required:
 *               - name
 *               - email
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
 *                 email:
 *                   type: string
 *               required:
 *                 - id
 *                 - name
 *                 - email
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/usuarios', createUsuario);



/**
 * @swagger
 * /usuarios/{id}:
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
 *                 email:
 *                   type: string
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
router.get('/usuarios/:id', getUsuarioById);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Update an existing user
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
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *             required:
 *               - nombre
 *               - correo
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 correo:
 *                   type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.put('/usuarios/:id', updateUsuario);


/**
 * @swagger
 * /usuarios/{id}:
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
 *       500:
 *         description: Internal server error
 */
router.delete('/usuarios/:id', deleteUsuario);

export default router;
