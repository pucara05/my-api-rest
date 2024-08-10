// controllers/itemsController.js
import pool from '../db.js'; // Importa la configuración de la base de datos desde db.js

// Obtener todos los items (GET /items)
export const getItems = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json({ message: "Ruta de prueba funcionando correctamente"} );
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

