const adminAuth=(req,res,next)=>{
    const token="xyz"
    const isAuthenticated=token==="xyz"
    if(!isAuthenticated){
        res.status(401).send("Unauthorized Access")
    }
    else{
        next()
    }
}

const userAuth=(req,res,next)=>{
    const usertoken="laxman"
    const isAuthenticated=usertoken==="laxman"
    if(!isAuthenticated){
        res.status(401).send("Unauthorized Access")
    }
    else{
        next()
    }
}
module.exports={
    adminAuth,userAuth
}