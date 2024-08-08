import express from 'express';

const router = express.Router();

let users = []; // Esto simula una base de datos en memoria

//Ruta raiz  
router.get('/', (req, res) => {
    res.send('Hello world');

});



/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       description: User object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request
 */
// Ruta para crear un nuevo usuario 

router.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);

});


/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */

router.get('/users', (req, res) => {
    res.json(users);
})

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */


const findUserById = (id) => users.find(u => u.id === parseInt(id, 10));
// Ruta para obtener un usuario por ID
router.get('/users/:id', (req, res) => {
    const user = findUserById(req.params.id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" }); res.status(404).send('User not found');
    }


});




/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualiza un usuario existente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
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
 *                 description: Nombre del usuario
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del usuario
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario
 *       404:
 *         description: Usuario no encontrado
 */

router.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Extraer el ID del usuario desde la URL
    const userIndex = users.find(user => user.id === id); // Encontrar el índice del Usuario


    if (userIndex !== -1) {
        // Actualizar los datos del usuario con los nuevos datos proporcionados
        users[userIndex] = { ...users[userIndex], ...req.body };
        res.json(users[userIndex]); // Enviar el usuario actualizado como respuest
    } else {
        res.status(404).json({ message: "User not found" });  // Enviar un mensaje de error si no se encuentra el usuario
    }



});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario existente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/users/:id', (req, res) => {
    // Paso 1: Obtener el ID del usuario desde la URL
    const id = parseInt(req.params.id, 10);

    // Paso 2: Encontrar el índice del usuario en el array
    const userIndex = users.findIndex(u => u.id === id);

    // Paso 3: Comprobar si el usuario fue encontrado
    if (userIndex !== -1) {
        // Paso 4: Eliminar el usuario del array
        users.splice(userIndex, 1);

        // Paso 5: Enviar una respuesta de éxito
        res.json({ message: 'User deleted successfully' });
    } else {
        // Paso 6: Enviar una respuesta de error si el usuario no fue encontrado
        res.status(404).json({ message: 'User not found' });
    }
});




export default router;