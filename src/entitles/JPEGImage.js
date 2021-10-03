const { nanoId } = require('nanoid');
const fs = require('fs').promises;
const path = require('path');
const { assetsPath } = require('../../config');

module.exports = class JPEGImage {
    constructor(id, createdAt, size) {
        this.id = id || nanoId();
        this.createdAt = createdAt || Date.now();
        this.originalFileName = `${this.id}_original.jpeg`;
        this.size = size;
    }

    async removeOriginal() {
        await fs.unlink(path.resolve(assetsPath, this.originalFileName));
    }

    toJSON() {
        return {
            id: this.id,
            size: this.size,
            createdAt: this.createdAt
        };
    }
    toPublicJSON() {
        return {
            id: this.id,
            size: this.size,
            createdAt: this.createdAt,
            originalUrl: path.resolve(assetsPath, this.originalFileName)
        };
    }
}