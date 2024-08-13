import db from "../index.js";
import createUsersTable from "./create-users-table.js";
import createBooksTable from "./create-books-table.js";
import createRentalsTable from "./create-rentals-table.js";

const runDbMigrations = async () => {
  console.log("BEGIN DB MIGRATION");

  // use single client forn transactions
  const client = await db.connect();

  try {
    await client.query("BEGIN"); // begin transaction

    await client.query(createUsersTable);

    await client.query(createBooksTable);

    await client.query(createRentalsTable);

    await client.query("COMMIT"); // commit transaction

    console.log("END DB MIGRATION");
  } catch (e) {
    await client.query("ROLLBACK"); // rollback transaction

    console.log("DB migration failed");

    throw e;
  } finally {
    client.release();
  }
};

export default runDbMigrations;