const JPEGImage = require('../../entitles/JPEGImage');
const db = require('../../entitles/Database');


module.exports = async (req, res) => {
    const { file } = req;
    const imageFile = new JPEGImage(file.filename.split('_original.')[0], Date.now(), file.size);
    await db.insert(imageFile);
    return res.json(imageFile.toPublicJSON());
}