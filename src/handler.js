const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (req, res) => {
  // declare every key
  const { title, tags, body } = req.payload;

  const id = nanoid(16); // random id
  const createdAt = new Date().toLocaleString(); // create date
  const updatedAt = createdAt;

  // create newNote's object
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

const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

const getNoteByIdHandler = (req, res) => {
  const { id } = req.params;

  const findNote = notes.filter((n) => n.id === id)[0];
  // console.log(note);

  if (findNote !== undefined) {
    return {
      status: "success",
      data: {
        note: findNote,
      },
    };
  }

  const response = res.response({
    status: "fail",
    message: "Note not found",
  });

  response.code(404);
  return response;
};

const editNoteByIdHandler = (req, res) => {
  const { id } = req.params;

  // get all new data
  const { title, tags, body } = req.payload;
  const updateAt = new Date().toLocaleString();

  // replace old note with new
  const indexOldNote = notes.findIndex((note) => note.id === id);

  // if find old note
  if (indexOldNote !== -1) {
    notes[indexOldNote] = {
      ...notes[indexOldNote],
      title,
      tags,
      body,
      updateAt,
    };

    const response = res.response({
      status: "success",
      message: "Note successfully edited",
    });

    response.code(200);
    return response;
  }

  const response = res.response({
    status: "fail",
    message: "Note not successfully edited. Id not found",
  });

  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (req, res) => {
  const { id } = req.params;

  const indexNoteWillDelete = notes.findIndex((note) => note.id === id);

  if (indexNoteWillDelete !== -1) {
    notes.splice(indexNoteWillDelete, 1);

    const response = res.response({
      status: "success",
      message: "Note deleted successfully",
    });

    response.code(201);
    return response;
  }

  const response = res.response({
    status: "fail",
    message: "Note deleted not successfully. Note id not found",
  });

  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
