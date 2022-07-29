const notFound = (req, res)=>{
    res.status(401).json({ msg: "Route Doesn't Exists"})
}

module.exports = notFound