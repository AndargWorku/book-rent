import db from "../db/index.js";

const createRental = async ({
    book_id,
    user_id,
    return_date, // Optional return_date
    price,
  }) => {
    try {
      const defaultReturnDate = new Date();
      defaultReturnDate.setDate(defaultReturnDate.getDate() + 14); // Default to 14 days later
  
      const finalReturnDate = return_date ? new Date(return_date) : defaultReturnDate;
  
      const query = `
        INSERT INTO rentals (
          book_id,
          user_id,
          rental_date,
          return_date,
          created_at,
          updated_at
        ) VALUES (
          $1, $2, CURRENT_TIMESTAMP, $3,
          CURRENT_TIMESTAMP,
          CURRENT_TIMESTAMP
        ) RETURNING *;
      `;
  
      const values = [
        book_id,
        user_id,
        finalReturnDate,
      ];
  
      const result = await db.query(query, values);
  
      return result.rows[0];
    } catch (error) {
      console.error("Error in createRental:", error);
      throw error; // Rethrow the error to be caught by the calling function
    }
  };
  


const findOne = async (user_name) => {
  try {
    const query = `
      SELECT * FROM rentals
      WHERE user_name = $1
    ;`;

    const result = await db.query(query, [user_name]);

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
            rentals
    ;`;

    const result = await db.query(query);

    return result.rows;
  } catch (error) {
    console.error("Error in findAll:", error);
    throw error;
  }
};

const updateRental = async (
    id,
    { book_id, user_id, return_date }
  ) => {
    try {
      // Build the query dynamically based on provided fields
      const query = `
        UPDATE rentals
        SET
          book_id = COALESCE($2, book_id),
          user_id = COALESCE($3, user_id),
          return_date = COALESCE($4, return_date),
          updated_at = CURRENT_TIMESTAMP
        WHERE
          id = $1
        RETURNING *;
      `;
  
      // Set values, using null for fields that are not being updated
      const values = [
        id,
        book_id || null,
        user_id || null,
        return_date || null,
      ];
  
      const result = await db.query(query, values);
  
      return result.rows[0];
    } catch (error) {
      console.error("Error in updateRental:", error);
      throw error;
    }
  };
  


const deleteOne = async (id) => {
  try {
    const query = `
        DELETE FROM
            rentals
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
  createRental,
  findOne,
  findAll,
  updateRental,
  deleteOne,
};