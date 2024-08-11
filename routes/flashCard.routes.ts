// create flashCard
// update flashCard
// delete flashCard
// fetch flashcards

// admin and user verification
// controllers

import express from 'express'
import { createFlashCard, fetchFlashCards, updateFlashCard,deleteFlashCard } from '../controllers/flashCard.controllers'

const Router = express.Router()

Router.route('/fetch-flashcards').get(fetchFlashCards)

Router.route('/create-flashcard').post(createFlashCard)

Router.route('/update-flashcard/:id').put(updateFlashCard)

Router.route('/delete-flashcard/:id').delete(deleteFlashCard)

export default Router