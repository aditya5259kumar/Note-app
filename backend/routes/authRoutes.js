const express = require("express");
const router = express.Router();

const passport = require("../passport/index").authenticateUser;

const Auth = require("../controller/auth");

const {
  signUpValidator,
  loginValidator,
  addNoteValidator,
  editNoteValidator,
  validate,
} = require("../utils/authValidator");
const auth = require("../controller/auth");

// -------------user--------------

// signUp
router.post("/auth/signup", signUpValidator, validate, Auth.signUp);

// logIn
router.post("/auth/login", loginValidator, validate, Auth.logIn);

// myProfile
router.get("/auth/me", passport, Auth.myProfile);

// -------------note--------------

// addNote
router.post(
  "/auth/addnote",
  addNoteValidator,
  validate,
  passport,
  Auth.addNote
);

// deleteNote
router.delete("/auth/deletenote/:noteId", passport, Auth.deleteNote);

// editNote
router.patch(
  "/auth/editnote/:noteId",
  editNoteValidator,
  validate,
  passport,
  Auth.editNote
);

// get all notes
router.get("/auth/getallnotes", passport, auth.getAllNotes);

// update note pinned
router.patch("/auth/update-note-pinned/:noteId", passport, auth.updateIsPinned);

// search note
router.get("/auth/note", passport, auth.searchNote);

// http://localhost:7000/api/user/auth/note?search={what you are}

module.exports = router;
