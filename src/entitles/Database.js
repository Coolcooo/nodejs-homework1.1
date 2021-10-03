const {EventEmitter} = require('events');
const { existsSync } = require('fs');
const { writeFile } = require('fs').promises;
const {dbDumpFile} = require('../../config');
const JPEGImage = require('./JPEGImage');

class Database extends EventEmitter {
    constructor() {
        super();

        this.idToImage = {}
    }
    async initFromDump() {
        const exists = existsSync(dbDumpFile);
        if (existsSync(dbDumpFile) === false) {
            return;
        }
        const dump = require(dbDumpFile);

        if (typeof dump === 'object') {
            this.idToImage = {};
            for (let id in dump) {
                const image = dump[id];
                this.idToImage[id] = new JPEGImage(image.id, image.createdAt, image.size);
            }
        }
    }
    async insert(image) {
        this.idToImage[image.id] = image;
        this.emit('changed');
    }

    async remove(imageId) {
        const imageRaw = this.idToImage[imageId];
        const image = new JPEGImage(imageRaw.id, imageRaw.createdAt, imageRaw.size);
        image.removeOriginal();
        delete this.idToImage[imageId];
        this.emit('changed');
        return imageId;
    }

    findOne(imageId) {
        const imageRaw = this.idToImage[imageId];
        if (!imageRaw) {
            return;
        }
        return new JPEGImage(imageRaw.id, imageRaw.createdAt, imageRaw.size);
    }
    find() {
        console.log(this.idToImage)
        return Object.values(this.idToImage).map((e) => {
               return {
                   id: e.id,
                   createdAt: e.createdAt,
                   size: e.size
                }
            }
        );
    }

    toJSON() {
        return this.idToImage;
    }
}

const db = new Database();

db.initFromDump();

db.on('changed', () => {
   writeFile(dbDumpFile, JSON.stringify(db.toJSON()));
});

module.exports = db;