// controllers/itemsController.js
//import pool from '../db.js'; // Importa la configuración de la base de datos desde db.js para postgresql

import promisePool from '../db.js';  // Asegúrate de usar la ruta correcta conexion para mysql y mariadb



export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};


export const getUsuarioById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await promisePool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};


export const createUsuario = async (req, res) => {
    try {
        const { nombre, correo } = req.body;

        if (!nombre || !correo) {
            return res.status(400).json({ error: 'Los campos nombre y correo son obligatorios' });
        }

        const [result] = await promisePool.query('INSERT INTO usuarios (nombre, correo) VALUES (?, ?)', [nombre, correo]);

        res.status(201).json({ id: result.insertId, nombre, correo });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};



export const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo } = req.body;
    
    console.log('Datos recibidos:', req.body);

    if (!nombre || !correo) {
        return res.status(400).json({ error: 'Faltan datos en la solicitud' });
    }

    try {
        const [result] = await promisePool.query(
            'UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?',
            [nombre, correo, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export const deleteUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await promisePool.query('DELETE FROM usuarios WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};








/*
// Obtener todos los items (GET /items)
export const getItems = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows );
  } catch (err) {
    console.error('Error al obtener los items:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};




// Obtener un item por ID (GET /items/:id)
export const getItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener el item:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo item (POST /items)
export const createItem = async (req, res) => {
  const { name } = req.body;

  try {
    const result = await pool.query('INSERT INTO items (name) VALUES ($1) RETURNING *', [name]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear el item:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un item existente (PUT /items/:id)
export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const result = await pool.query('UPDATE items SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar el item:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un item existente (DELETE /items/:id)
export const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item no encontrado' });
    }
    res.status(204).send(); // No content
  } catch (err) {
    console.error('Error al eliminar el item:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

*/