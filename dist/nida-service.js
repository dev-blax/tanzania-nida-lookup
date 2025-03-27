"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NidaService = void 0;
const axios_1 = __importDefault(require("axios"));
const buffer_1 = require("buffer");
const sharp_1 = __importDefault(require("sharp"));
class NidaService {
    constructor() {
        this.BASE_URL = "https://ors.brela.go.tz/um/load/load_nida/{}";
    }
    getHeaders() {
        return {
            "Content-Type": "application/json",
            "Content-Length": "0",
            "Connection": "keep-alive",
            "Accept-Encoding": "gzip, deflate, br",
        };
    }
    async base64ToImage(imageStr) {
        if (!imageStr)
            return undefined;
        if (buffer_1.Buffer.isBuffer(imageStr))
            return imageStr;
        try {
            const imageBuffer = buffer_1.Buffer.from(imageStr, 'base64');
            return await (0, sharp_1.default)(imageBuffer).toBuffer();
        }
        catch (error) {
            console.error('Image conversion error:', error);
            return undefined;
        }
    }
    async processImages(userData) {
        if (userData.PHOTO) {
            userData.PHOTO = await this.base64ToImage(userData.PHOTO);
        }
        if (userData.SIGNATURE) {
            userData.SIGNATURE = await this.base64ToImage(userData.SIGNATURE);
        }
        return userData;
    }
    capitalizeKeys(userData) {
        const processedData = {};
        for (const [key, value] of Object.entries(userData)) {
            processedData[key.toUpperCase()] = value;
        }
        return processedData;
    }
    async lookupUser(nidaNumber) {
        var _a, _b;
        try {
            const url = this.BASE_URL.replace('{}', nidaNumber);
            const response = await axios_1.default.get(url, {
                headers: this.getHeaders(),
            });
            if ((_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.obj) === null || _b === void 0 ? void 0 : _b.result) {
                const userData = this.capitalizeKeys(response.data.obj.result);
                return await this.processImages(userData);
            }
            return null;
        }
        catch (error) {
            console.error('NIDA lookup error:', error);
            throw error;
        }
    }
}
exports.NidaService = NidaService;
