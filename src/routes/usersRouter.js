import express, {Router} from "express";
const router = express.Router();



router.get('/', (req, res) => {
    const data = ["User 1", "User 2", "User 3"];
    res.send({data})
});


export default router