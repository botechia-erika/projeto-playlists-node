import { matchedData } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import { handleHttpError } from "../errors/handleError.js";
import { handlePasswordCompare, handlePasswordHash } from "../utils/handlePassword.js";
import { db } from "../config/knex.js";
import { tokenSignIn } from "../utils/handleJWT.js";

export const signUpUser = async (req, res) => {
  try {
    req = matchedData(req);
    const data2InsertDBR = {
      id: uuidv4(),
      name: req.name,
      email: req.email,
      password_hash: await handlePasswordHash(req.password),
      age: 30 // Default age, can be modified later
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


    const data = {
      token: await tokenSignIn({ userObj: data2InsertDBR }),
      user: data2InsertDBR
    }
    res.status(201).json({ data});

  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_SIGN_UP_USER", error);
  }
};


export const signInUser = async (req, res) => {
  try {
    const { email, password } = matchedData(req);

    // Search user by email
    const userResult = await db.raw("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);

    // Check if user exists
    if (!userResult || userResult.length === 0) {
      handleHttpError(res, "ERROR_SIGN_IN_USER", "Invalid credentials");
      return;
    }

    const user = userResult[0];

    // Compare password hashes (NÃO faça hash do hash!)
    const isValidPassword = await handlePasswordCompare(
      password,
      user.password_hash
    );
    if (!isValidPassword) {
      handleHttpError(res, "ERROR_SIGN_IN_USER", "Invalid credentials");
      return;
    }

    // Generate token and return data
    
    const data = {
      token: await tokenSignIn({ userObj: user }),
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
    };

    res.json({ data });
  } catch (error) {
    console.error("Error in signIn:", error);
    handleHttpError(res, "ERROR_SIGN_IN_USER", error.message);
  }
};