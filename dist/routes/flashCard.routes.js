"use strict";
// create flashCard
// update flashCard
// delete flashCard
// fetch flashcards
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// admin and user verification
// controllers
const express_1 = __importDefault(require("express"));
const flashCard_controllers_1 = require("../controllers/flashCard.controllers");
const Router = express_1.default.Router();
Router.route('/fetch-flashcards').get(flashCard_controllers_1.fetchFlashCards);
Router.route('/create-flashcard').post(flashCard_controllers_1.createFlashCard);
Router.route('/update-flashcard/:id').put(flashCard_controllers_1.updateFlashCard);
Router.route('/delete-flashcard/:id').delete(flashCard_controllers_1.deleteFlashCard);
exports.default = Router;
