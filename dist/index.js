"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8000; // default port to listen
const router = express_1.default.Router();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true, //access-control-allow-credentials:truel
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
var listMessage = [];
var listNumber = [];
var listCalc = [];
app.get('/', (req, res) => {
    return res.json(listMessage);
});
app.route('/new').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // post to add a new message to the list
    try {
        listMessage.push({ text: req.body.text, author: req.body.author });
        console.log("🚀 ~ file: index.ts:21 ~ app.route ~ listMessage", listMessage);
        return res.json(listMessage);
    }
    catch (error) {
        console.log(error);
        return res.send('Error');
    }
}));
app.route('/update').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.reset === true) {
            listNumber = listNumber.slice();
            listCalc = listCalc.slice();
            return res.json('reset');
        }
        if (listNumber.length === 0) {
            listNumber = [req.body.number];
            console.log(listNumber);
            return res.json(listNumber[0]);
        }
        // post to add a new number to the list
        listNumber.push(req.body.number);
        // calculate new number and the previous average
        listCalc.push((listNumber[listNumber.length - 1] + listNumber[listNumber.length - 2]) / 2);
        return res.json(listCalc[listCalc.length - 1]);
    }
    catch (error) {
        console.log(error);
        return res.send('Error');
    }
}));
app.route('/all').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get to get all the numbers
    return res.json({ listNumber, listCalc });
}));
