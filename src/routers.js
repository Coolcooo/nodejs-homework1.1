const { Router } = require('express');
const { nanoid } = require('nanoid');
const fs = require('fs').promises;
const { getImage,
    deleteImage,
        getList,
    uploadImage,
        replaceBackground } = require('./controllers/api');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/assets')
    },
    filename: function (req, file, cb) {
        const fileId = nanoid();
        cb(null, `${fileId}_original.jpeg`);
    }
})


const upload = multer({storage: storage});

const mainRouter = new Router();

mainRouter.get('/merge', replaceBackground);
mainRouter.get('/list', getList);
mainRouter.get('/image/:id', getImage);
mainRouter.delete('/image/:id', deleteImage);
mainRouter.post('/upload', upload.single('image'), uploadImage);

module.exports = mainRouter;