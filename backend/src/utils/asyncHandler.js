const asyncHandler = (requestHandler)=>{
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    }
}

export {asyncHandler}

// higher order function functionas parameter as well as return function


// const asyncHandler = (fn)=>async(req, res, next)=>{
//     try {
//         await fn(req, res, next);
//     } catch (err) {
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })
//     }

// }

/*
const asyncHandler = (fn)=>{()=>{}}
const asyncHandler = (fn)=>async()=>{}



    
*/