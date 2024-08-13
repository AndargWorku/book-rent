import db from "../db/index.js";
import userRepository from "./user-repository.js";

const createBook = async ({
  name,
  author,
  price,
  owner,
  category,
  quantity,
  cover_image,
  status,
  inactive_by,
}) => {
  try {
    const query = `
      INSERT INTO books (
        name,
        author,
        price,
        owner,
        category,
        quantity,
        cover_image,
        status,
        inactive_by,
        created_at,
        updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      ) RETURNING *;
    `;

    const values = [
      name,
      author,
      price || 0,           // Default price to 0 if not provided
      owner,
      category,
      quantity || 0,        // Default quantity to 0 if not provided
      cover_image,
      status,
      inactive_by,          // Can be null if not provided
    ];

    console.log(values);

    const result = await db.query(query, values);
    await userRepository.findOne(owner).then((user) => userRepository.updateUser(owner, {count: user.count + 1}))

    return result.rows[0];
  } catch (error) {
    console.error("Error in createBook:", error);
    throw error; // Rethrow the error to be caught by the calling function
  }
};



const findOne = async (id) => {
  try {
    const query = `
      SELECT * FROM books
      WHERE id = $1
    ;`;

    const result = await db.query(query, [id]);

    // console.log("Query Result:", result.rows);

    return result.rows[0];
  } catch (error) {
    console.error("Error in findOne:", error);
    throw error;
  }
};

const findAll = async () => {
  try {
    const query = `
        SELECT * FROM
            books
    ;`;

    const result = await db.query(query);

    return result.rows;
  } catch (error) {
    console.error("Error in findAll:", error);
    throw error;
  }
};

const updateBook = async (
  id,
  { name, author, price, owner, category, quantity, cover_image, status, inactive_by }
) => {
  try {
    const query = `
      UPDATE books
      SET
        name = COALESCE($2, name),
        author = COALESCE($3, author),
        price = COALESCE($4, price),
        owner = COALESCE($5, owner),
        category = COALESCE($6, category),
        quantity = COALESCE($7, quantity),
        cover_image = COALESCE($8, cover_image),
        status = COALESCE($9, status),
        inactive_by = COALESCE($10, inactive_by),
        updated_at = CURRENT_TIMESTAMP
      WHERE
        id = $1
      RETURNING *;
    `;

    const values = [
      id,
      name || null,
      author || null,
      price || null,
      owner || null,
      category || null,
      quantity || null,
      cover_image || null,
      status || null,
      inactive_by || null,
    ];

    const result = await db.query(query, values);

    return result.rows[0];
  } catch (error) {
    console.error("Error in updateBook:", error);
    throw error;
  }
};

const deleteOne = async (id) => {
  try {
    const query = `
        DELETE FROM
            books
        WHERE
            id = $1
        RETURNING *
    ;`;
    console.log(id);
    const result = await db.query(query, [+id]);
    const user = await userRepository.findOne(owner.id)
    await userRepository.updateUser(owner.id, {count: user.count - 1})

    return result.rows[0];
  } catch (error) {
    console.error("Error in deleteOne:", error);
    throw error;
  }
};

export default {
  createBook,
  findOne,
  findAll,
  updateBook,
  deleteOne,
};