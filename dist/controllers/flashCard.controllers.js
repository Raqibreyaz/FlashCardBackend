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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFlashCards = exports.deleteFlashCard = exports.updateFlashCard = exports.createFlashCard = void 0;
const catchAsyncError_1 = require("../utils/catchAsyncError");
const connectToDatabase_1 = require("../db/connectToDatabase");
const Apierror_1 = require("../utils/Apierror");
const fetchFlashCards = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, connectToDatabase_1.getConnection)();
    const query = `
    SELECT * FROM flashCard
    `;
    const [flashCards] = yield connection.execute(query);
    connection.release();
    res.status(200).json({
        success: true,
        message: "flashcards fetched successfully",
        flashCards,
    });
}));
exports.fetchFlashCards = fetchFlashCards;
const createFlashCard = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { question, answer } = req.body;
    if (!question || !answer) {
        throw new Apierror_1.ApiError(400, "provide necessary details to create a flashcard");
    }
    const connection = yield (0, connectToDatabase_1.getConnection)();
    const query = `
  INSERT INTO flashCard (question,answer)
  VALUES(?,?)
  `;
    yield connection.execute(query, [question, answer]);
    connection.release();
    res.status(200).json({
        success: true,
        message: "flashcard added successfully",
    });
}));
exports.createFlashCard = createFlashCard;
const updateFlashCard = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { question, answer } = req.body;
    const flashCardId = req.params.id;
    if ((!question && !answer) || !flashCardId)
        throw new Apierror_1.ApiError(400, "provide something to update");
    const connection = yield (0, connectToDatabase_1.getConnection)();
    const values = [];
    const fields = [];
    if (question) {
        fields.push("question = ?");
        values.push(question);
    }
    if (answer) {
        fields.push("answer = ?");
        values.push(answer);
    }
    const query = `
    UPDATE flashCard
    SET  ${fields.join(", ")}
    WHERE id = ?
    `;
    // adding id at last to update
    values.push(flashCardId);
    yield connection.execute(query, values);
    connection.release();
    res.status(200).json({
        success: true,
        message: "flashcard updated successfully",
    });
}));
exports.updateFlashCard = updateFlashCard;
const deleteFlashCard = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const flashCardId = req.params.id;
    if (!flashCardId)
        throw new Apierror_1.ApiError(400, "provide flash card id to delete");
    const query = `
  DELETE FROM flashCard
  WHERE id = ?
  `;
    const connection = yield (0, connectToDatabase_1.getConnection)();
    yield connection.execute(query, [flashCardId]);
    connection.release();
    res.status(200).json({
        success: true,
        message: "flash card deleted successfully",
    });
}));
exports.deleteFlashCard = deleteFlashCard;
