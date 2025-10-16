export function globalErr(err,_req,res,_next){
    res.status(500 || err.status).json({msg: `❌ Error - ${err.message}` });
   
}

export function log(req,_res,next){
    console.log(`${req.method} - ${req.path}`)
    next()
}