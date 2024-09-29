const Role = require("./models/Role");
const Application = require("./models/Application");

const getRoles = async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
};

const createRole = async (req, res) => {
  const { name, description } = req.body;
  const role = new Role({ name, description });
  await role.save();
  res.json(role);
};

const getApplicationsByRole = async (req, res) => {
  const { role } = req.params;
  const role_id = await Role.findOne({ name: role });
  const applications = await Application.find({ role: role_id });
  res.json(
    applications.map((application) => {
      return {
        name: application.name,
        score: application.finalScore,
        appliedOn: application.createdAt,
        id: application._id,
      };
    })
  );
};

const getApplicationByUser = async (req, res) => {
  const { user } = req.params;
  const application = await Application.findById(user);
  res.json(application);
};

const createApplication = async (req, res) => {
  const { name, role } = req.body;
  const application = new Application({ name, role });
  await application.save();

  res.json({ id: application._id });
};

const uploadFiles = async (req, res) => {
  const { user } = req.params;
  const application = await Application.findById(user);
  // get files from request and save them to application

  res.json({ success: true });
};

module.exports = {
  getRoles,
  createRole,
  getApplicationsByRole,
  getApplicationByUser,
  createApplication,
  uploadFiles,
};
