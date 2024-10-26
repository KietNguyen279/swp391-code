const db = require('../config/db');

// Get all news blogs
const getAllNewsBlogs = (callback) => {
  const query = `SELECT * FROM News_blog;`;
  db.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

// Get news blog by ID
const getNewsBlogById = (id, callback) => {
  const query = `SELECT * FROM News_blog WHERE id = ?;`;
  db.query(query, [id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    if (results.length > 0) {
      return callback(null, results[0]);
    } else {
      return callback(null,
        null); // News blog not found
    }
  });
};

// Create news blog
const createNewsBlog = (image, title, content, date_published, user_id, callback) => {

  if (!image || !title || !content || !date_published || !user_id) {
    return callback(new Error('Invalid input data'), null);
  }

  const query = `
    INSERT INTO News_blog (image, title, content, date_published, user_id)
    VALUES (?, ?, ?, ?, ?);
  `;
  db.query(query, [image, title, content, date_published, user_id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.affectedRows);
  });
};

// Update news blog by ID
const updateNewsBlogById = (id, image, title, content, date_published, user_id, callback) => {

  if (image !== undefined && !image) {
    return callback(new Error('Invalid input data: Image cannot be empty.'), null);
  }
  if (title !== undefined && !title) {
    return callback(new Error('Invalid input data: Title cannot be empty.'), null);
  }
  if (content !== undefined && !content) {
    return callback(new Error('Invalid input data: Content cannot be empty.'), null);
  }
  if (date_published !== undefined && !date_published) {
    return callback(new Error('Invalid input data: Date published cannot be empty.'), null);
  }
  if (user_id !== undefined && !user_id) {
    return callback(new Error('Invalid input data: User ID cannot be empty.'), null);
  }

  const updateFields = [];
  const updateValues = [];
  if (image !== undefined) { updateFields.push('image = ?'); updateValues.push(image); }
  if (title !== undefined) { updateFields.push('title = ?'); updateValues.push(title); }
  if (content !== undefined) { updateFields.push('content = ?'); updateValues.push(content); }
  if (date_published !== undefined) { updateFields.push('date_published = ?'); updateValues.push(date_published); }
  if (user_id !== undefined) { updateFields.push('user_id = ?'); updateValues.push(user_id); }

  if (updateFields.length === 0) {
    return callback(new Error('No fields to update.'), null);
  }

  let formattedDate = date_published || null;
  if (date_published !== undefined) {
    formattedDate = new Date(date_published).toISOString().slice(0, 19).replace('T', ' ');
  }

  const query = `
    UPDATE News_blog 
    SET image = ?, title = ?, content = ?, date_published = ?, user_id = ?
    WHERE id = ?;
  `;

  db.query(query, [image, title, content, formattedDate, user_id, id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.affectedRows);
  });
};

// Delete news blog by ID
const deleteNewsBlogById = (id, callback) => {
  const query = `DELETE FROM News_blog WHERE id = ?;`;
  db.query(query, [id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    if (results.affectedRows === 0) {
      return callback(new Error('NewsBlog not found.'), null);
    } else {
      return callback(null, results.affectedRows);
    }
  });
};

module.exports = {
  getAllNewsBlogs,
  getNewsBlogById,
  createNewsBlog,
  updateNewsBlogById,
  deleteNewsBlogById
};