export const customHeader = (req, res, next) => {
    try {
        const apiKey = req.headers.api_key;
        if(!apiKey ||apiKey=== ""){
            return res.status(403).send({ message: "API_KEY is required" });
        }

        next();
    } catch (error) {
        console.error("Error in customHeader middleware:", error);
        res.status(500).send({ message: "Internal Server Error" });
        
    }
}