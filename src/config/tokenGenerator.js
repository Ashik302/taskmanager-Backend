import jwt from "jsonwebtoken"


const tokenGenerator = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SCERET_KEY,{ expiresIn: "1h"})
}

export default tokenGenerator;