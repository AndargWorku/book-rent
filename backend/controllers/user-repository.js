import db from "../db/index.js";
import hashPassword from "../utils/hash-password.js";

const createUser = async ({
  first_name,
  last_name,
  user_name,
  email,
  password,
  mobile,
  location,
  roles,
  status,
  count,
}) => {
  try {
    const query = `
      INSERT INTO users (
        first_name,
        last_name,
        user_name,
        email,
        password,
        mobile,
        location,
        roles,
        status,
        count,
        created_at,
        updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      ) RETURNING *;
    `;
    
    const passwordb = await hashPassword(password);

    const values = [
      first_name,
      last_name,
      user_name,
      email,
      passwordb,
      mobile,
      location,
      roles,  // Assuming roles is an array of strings
      status,
      count,
    ];

    const result = await db.query(query, values);

    return result.rows[0];
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error; // Rethrow the error to be caught by the calling function
  }
};


const findOne = async (id) => {
  try {
    const query = `
      SELECT * FROM users
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

const findByEmail = async (email) => {
  try {
    const query = `
      SELECT * FROM users
      WHERE email = $1
    ;`;

    const result = await db.query(query, [email]);

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
            users
    ;`;

    const result = await db.query(query);

    return result.rows;
  } catch (error) {
    console.error("Error in findAll:", error);
    throw error;
  }
};

const updateUser = async (
  id,
  { first_name, last_name, user_name, email, password, mobile, location, roles, status, count }
) => {
  try {
    const query = `
      UPDATE users
      SET
        first_name = COALESCE($2, first_name),
        last_name = COALESCE($3, last_name),
        user_name = COALESCE($4, user_name),
        email = COALESCE($5, email),
        password = COALESCE($6, password),
        mobile = COALESCE($7, mobile),
        location = COALESCE($8, location),
        roles = COALESCE($9, roles),
        status = COALESCE($10, status),
        updated_at = CURRENT_TIMESTAMP,
        count = COALESCE($11, count)
      WHERE
        id = $1
      RETURNING *;
    `;

    const values = [
      id,
      first_name || null,
      last_name || null,
      user_name || null,
      email || null,
      password || null,
      mobile || null,
      location || null,
      roles || null,  // Assuming roles is still an array of strings
      status || null,
      count || null,
    ];

    const result = await db.query(query, values);

    return result.rows[0];
  } catch (error) {
    console.error("Error in updateUser:", error);
    throw error;
  }
};



const deleteOne = async (id) => {
  try {
    const query = `
        DELETE FROM
            users
        WHERE
            id = $1
        RETURNING *
    ;`;
    console.log(id);
    const result = await db.query(query, [+id]);

    return result.rows[0];
  } catch (error) {
    console.error("Error in deleteOne:", error);
    throw error;
  }
};

export default {
  createUser,
  findOne,
  findByEmail,
  findAll,
  updateUser,
  deleteOne,
};