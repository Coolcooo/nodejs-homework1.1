const db = require('../../entitles/Database');
const {replaceBackground} = require('backrem');
const {assetsPath} = require('../../../config');
const path = require('path');
const fs = require('fs');
module.exports = async (req, res) => {
    const frontUrl = req.query.front && db.findOne(req.query.front) && db.findOne(req.query.front).originalFileName;
    const backUrl =  req.query.back && db.findOne(req.query.back) && db.findOne(req.query.back).originalFileName;
    const color = req.query.color && req.query.color.split(',').map(parseFloat);
    const threshold = req.query.threshold;
    console.log(frontUrl, backUrl);
    if (frontUrl && backUrl) {
        res.setHeader('content-type', 'image/jpeg');
        const frontImg = fs.createReadStream(path.resolve(assetsPath, frontUrl));
        const backImg = fs.createReadStream(path.resolve(assetsPath, backUrl));
        replaceBackground(frontImg, backImg, color, threshold || 0).then((readableStream) => {
            readableStream.pipe(res);
        });
    }
}