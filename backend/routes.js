const express = require("express");
const {
  getRoles,
  createRole,
  getApplicationsByRole,
  getApplicationByUser,
  createApplication,
  uploadFiles,
} = require("./controllers.js");

const router = express.Router();

router.get("/roles", getRoles);
router.post("/roles", createRole);
router.get("/roles/:role", getApplicationsByRole);
router.get("/application/:user", getApplicationByUser);
router.post("/application", createApplication);
router.post("/application/:user", uploadFiles);

module.exports = router;
