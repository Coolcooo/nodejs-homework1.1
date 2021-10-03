const {assetsPath} = require('../../../config');
const path = require('path');

module.exports = async (req, res) => {
    const imageId = req.params.id;
    return res.download(path.resolve(assetsPath, `${imageId}_original.jpeg`));
}