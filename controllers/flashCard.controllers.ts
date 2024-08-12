import { catchAsyncError } from "../utils/catchAsyncError.ts";
import { getConnection } from "../db/connectToDatabase.ts";
import { ApiError } from "../utils/Apierror.ts";

const fetchFlashCards = catchAsyncError(async (req, res, next) => {
  const connection = await getConnection();

  const query = `
    SELECT * FROM flashCard
    `;
  const [flashCards] = await connection.execute(query);

  connection.release();

  res.status(200).json({
    success: true,
    message: "flashcards fetched successfully",
    flashCards,
  });
});

const createFlashCard = catchAsyncError(async (req, res, next) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    throw new ApiError(400, "provide necessary details to create a flashcard");
  }

  const connection = await getConnection();

  const query = `
  INSERT INTO flashCard (question,answer)
  VALUES(?,?)
  `;

  await connection.execute(query, [question, answer]);

  connection.release();

  res.status(200).json({
    success: true,
    message: "flashcard added successfully",
  });
});

const updateFlashCard = catchAsyncError(async (req, res, next) => {
  const { question, answer } = req.body;

  const flashCardId = req.params.id;

  if ((!question && !answer) || !flashCardId)
    throw new ApiError(400, "provide something to update");

  const connection = await getConnection();

  const values: string[] = [];
  const fields: string[] = [];

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

  await connection.execute(query, values);

  connection.release();

  res.status(200).json({
    success: true,
    message: "flashcard updated successfully",
  });
});

const deleteFlashCard = catchAsyncError(async (req, res, next) => {
  const flashCardId = req.params.id;

  if (!flashCardId) throw new ApiError(400, "provide flash card id to delete");

  const query = `
  DELETE FROM flashCard
  WHERE id = ?
  `;

  const connection = await getConnection();

  await connection.execute(query, [flashCardId]);

  connection.release();

  res.status(200).json({
    success: true,
    message: "flash card deleted successfully",
  });
});

export { createFlashCard, updateFlashCard, deleteFlashCard, fetchFlashCards };
