import { matchedData } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import { handleHttpError } from "../errors/handleError.js";
import { handlePasswordHash } from "../utils/handlePassword.js";
import { db } from "../config/knex.js";

export const signUpUser = async (req, res) => {
  try {
    req = matchedData(req);
    const data2InsertDBR = {
      id: uuidv4(),
      name: req.name,
      email: req.email,
      password_hash: await handlePasswordHash(req.password),
      age: req.age || null
    };
    if (!data2InsertDBR.name || !data2InsertDBR.email || !data2InsertDBR.password_hash) {
      handleHttpError(res, "ERROR_SIGN_UP_USER", "Missing data");
      return;
    }
    await db.raw(
      "INSERT INTO Users (id, name, email, password_hash, age) VALUES (?, ?, ?, ?, ?)",
      [
        data2InsertDBR.id,
        data2InsertDBR.name,
        data2InsertDBR.email,
        data2InsertDBR.password_hash,
        data2InsertDBR.age
      ]
    );

    const userResult = await db.raw(
      "SELECT name, email, age FROM Users WHERE Users.id = ?",
      [data2InsertDBR.id]
    );
    const user = userResult[0] || (userResult.rows && userResult.rows[0]);
    if (!user) {
      handleHttpError(res, "ERROR_SIGN_UP_USER", "User not found after insertion");
      return;
    }

    const dataResult = await db.raw(
      "SELECT id, name, email FROM Users WHERE id = ?",
      [data2InsertDBR.id]
    );

    res.json({ data: dataResult[0] || (dataResult.rows && dataResult.rows[0]) });

  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_SIGN_UP_USER", error);
  }
};


export const signInUser = async () => {
  try {

  } catch (error) {
    // You may want to handle errors here if you add logic later
        console.log(error);
        handleHttpError(res, "ERROR_SIGN_UP_USER", error);
  }
};
