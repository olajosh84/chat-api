const dashboard = async (req, res) => {
    //res.json({data: req.user.username})
   res.status(200).json({status: true, msg: `Hello ${req.user.username} with userId: ${req.user.userId}`})
}

module.exports = dashboard;