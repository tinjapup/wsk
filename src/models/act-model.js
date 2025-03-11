import promisePool from '../utils/database.js';

const findActivities = async (user, id) => {
  console.log("findActivities testing", user, id);

  try {
    let query, values;

    if (id == 0) {
      query = "SELECT * FROM Activities ORDER BY name ASC";
    } else {
      // id = 1;
      query = "SELECT * FROM Activities WHERE activity_id = ?";
      values = [id];
    }

    const [rows] = await promisePool.query(query, values);

    if (rows.length > 0) {
      console.log("rows", rows);
      return rows;
    } else {
      console.log("No rows found");
      return [];
    }

  } catch (e) {
    console.error("Error:", e.message);
    return { error: e.message };
  }
};

export {findActivities};
