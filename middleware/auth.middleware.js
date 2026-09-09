import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {   
        return res.json({ success: false, message: 'Login Please' })
    }
    try 
    {

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id)
        {
            req.body ??={}
            req.body.userId = tokenDecode.id

        }
        else
        {
            return res.json({ success: false, message: 'Not Authorized' })
        }
        next()

    } catch (error) 
    {
        return res.status(401).json({ message: 'Unauthorized' })
    }
};

export default userAuth