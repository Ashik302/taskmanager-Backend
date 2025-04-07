import jwt from "jsonwebtoken"
const protect = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Get token after 'Bearer'
    console.log("this is token", token)

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SCERET_KEY);

        // Attach user to the request object
        req.user = decoded.id;

        next();
    } catch (err) {
        console.log("error ", err)
        return res.status(401).json({ message: "Token is not valid" });
    }
};
export default protect;
