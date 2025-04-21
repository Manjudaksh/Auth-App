import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
    const {token} = req.cookies;
    // console.log("Token", token);
    // console.log(process.env.JWT_SECRET);
    
    if(!token){
        return res.json({success: false, message: "Not Authorized Login Again"});
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        if(tokenDecode){
            // req.body.userId = tokenDecode.id
            req.userId = tokenDecode.id;
        }else{
            return res.json({success: false, message: "Not Authorized Login Again"});
        }

        next();
    } catch (error) {
        return res.json({success: false, message: error.message});
        
    }
}

export default userAuth;