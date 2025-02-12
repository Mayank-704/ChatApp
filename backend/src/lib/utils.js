import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
      
    const token = jwt.sign({userId},process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    )

    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000, //in millisecond
        httpOnly:true, //prevent Xss Attacks cross site scripting attack
        sameSite:"strict",//CSRF attacks cross site request forgery attack
        secure: process.env.NODE_ENVIRONMENT !== "development"
    })

    return token;

}