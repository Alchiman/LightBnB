const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");
/// Users
const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  // tristanjacobs@gmail.com
  // $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
  return pool
    .query(`SELECT * FROM users WHERE email = $1;`, [email])
    .then((results) => {
      if (!results.rowCount) {
        return null;
      }
      return results.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query(`SELECT * FROM users WHERE id = $1;`, [id])
    .then((results) => {
      if (!results.rowCount) {
        return null;
      }
      return results.rows[0];
    })
    .catch((err) => console.log(err.message));
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  return pool
    .query(
      `INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *;`,
      [user.name, user.email, user.password]
    )
    .then((results) => {
      return results.rows[0];
    })
    .catch((err) => console.log(err.message));
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
    .query(`SELECT * FROM reservations WHERE guest_id = $1 LIMIT $2`, [
      guest_id,
      limit,
    ])
    .then((results) => {
      return results.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
    `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
  if (options.owner_id) {
    queryParams.push(options.owner_id);

    queryParams.length === 1
      ? (queryString += `AND WHERE properties.owner_id = $${queryParams.length}`)
      : (queryString += `WHERE properties.owner_id = $${queryParams.length}`);
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(
      options.minimum_price_per_night * 100,
      options.maximum_price_per_night * 100
    );
    queryParams.length !== 2
      ? (queryString += `AND cost_per_night >= $${queryParams.length -
          1} AND cost_per_night <= $${queryParams.length} `)
      : (queryString += `WHERE cost_per_night >= $${queryParams.length -
          1} AND cost_per_night <= $${queryParams.length} `);
  }

  queryString += ` GROUP BY properties.id`;

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += ` HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  // 4
  queryParams.push(limit);
  queryString += `ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool
    .query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryParams = [];

  const queryParamsIndicators = [];

  let numOfKeys = 1;
  for (const key in property) {
    queryParams.push(property[key]);
    queryParamsIndicators.push(`$${numOfKeys}`);
    numOfKeys++;
  }

  let queryString = `
  INSERT INTO properties (${Object.keys(property).join()})
  VALUES(${queryParamsIndicators.join()})
  RETURNING *;
  `;

  console.log(queryString, queryParams);
  return pool
    .query(queryString, queryParams)
    .then((result) => {
      console.log(result.rows);
    })
    .catch((err) => console.log(err.message));
};
exports.addProperty = addProperty;
