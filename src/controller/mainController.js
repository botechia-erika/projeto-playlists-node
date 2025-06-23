import { handleHttpError } from "../errors/handleError.js";

export const getMain = async(req, res) => {
    try {
        res.status(200).sendFile("index.html", {root: "./src/public"})
    } catch (error) {
        console.error("Error in getMain:", error);
        handleHttpError(res, "ERROR_GET_MAIN", "Failed to load main page");
        };
    }
