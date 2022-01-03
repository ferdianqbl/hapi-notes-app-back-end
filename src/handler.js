const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (req, res) => {
  // declare every key
  const { title, tags, body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString;
  const updatedAt = createdAt;

  const newNote = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  };

  // push to notes
  notes.push(newNote);

  // is newNote has been added
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = res.response({
      status: "success",
      message: "New Note successfully added",
      data: {
        noteId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = res.response({
    status: "fail",
    message: "New Note not successfully added",
  });

  response.code(500);
  return response;
};

module.exports = { addNoteHandler };
