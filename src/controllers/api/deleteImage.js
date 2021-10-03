const db = require('../../entitles/Database');

module.exports = async (req, res) => {
    const reqId = req.params.id;
    console.log(reqId);
    const id = db.remove(reqId);
    return res.json({id});
}