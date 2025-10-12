export function globalErr(err,_req,res,next){
    res.status(500).json({msg: `❌ Error - ${err.message}` });
    next()
}

export function log(req,_res,_next){
    console.log(`${req.methof} - ${req.path}`)
}