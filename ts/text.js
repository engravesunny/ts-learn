"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.use('/api', router);
router.get('/list', (req, res) => {
    res.json({
        code: 200
    });
});
app.listen(9001, () => {
    console.log(9001);
});
