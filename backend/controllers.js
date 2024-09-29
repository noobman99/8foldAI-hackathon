const Role = require("./models/Role");
const Application = require("./models/Application");
const Recommendation = require("./models/Recommendation");
const multer = require("multer");
const fs = require("fs");

const THRESHOLD = 0.7;

const getRoles = async (req, res) => {
  const roles = await Role.find({});
  console.log(roles);
  var processed_roles = [];
  for (var i = 0; i < roles.length; i++) {
    const applications = await Application.find({ role: roles[i]._id });
    const viable_applications = applications.filter((application) => {
      return application.finalScore > THRESHOLD;
    });
    console.log(viable_applications);
    processed_roles.push({
      name: roles[i].name,
      expectations: roles[i].expectations,
      applications: applications.length,
      viableApplications: viable_applications.length,
    });
  }
  res.json({ msg: processed_roles });
};

const createRole = async (req, res) => {
  const { name, expectations } = req.body;
  const role = new Role({ name, expectations });
  await role.save();
  res.json({ msg: role._id, success: true });
};

const getApplicationsByRole = async (req, res) => {
  const { role } = req.params;
  const applications = await Application.find({
    role: role.replace(/-/g, " "),
  });
  res.json({
    msg: applications.map((application) => {
      return {
        name: application.name,
        score: application.finalScore,
        appliedOn: application.createdAt,
        id: application._id,
      };
    }),
  });
};

const getApplicationByUser = async (req, res) => {
  const { user } = req.params;
  const application = await Application.findById(user);
  res.json({ msg: application });
};

const createApplication = async (req, res) => {
  const { name, role } = req.body;
  const application = new Application({ name, role });
  await application.save();

  res.json({ msg: application._id, success: true });
};

const uploadFiles = async (req, res) => {
  const { user } = req.params;
  const application = await Application.findById(user);
  // get files from request and save them to application

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `static/${file.fieldname}`);
    },
    filename: function (req, file, cb) {
      cb(null, `${user}-${file.originalname}`);
    },
    fileFilter: function (req, file, cb) {
      if (file.fieldname === "resume") {
        if (file.mimetype === "application/pdf") {
          cb(null, true);
        } else {
          cb(new Error("Invalid file type for resume"));
        }
      } else {
        if (file.mimetype === ".txt") {
          cb(null, true);
        } else {
          cb(new Error("Invalid file type for recommendation"));
        }
      }
    },
  });

  const upload = multer({ storage }).fields([
    { name: "resume", maxCount: 1 },
    { name: "recommendation", maxCount: 5 },
  ]);

  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false });
    }

    const files = req.files;
    if (!files.resume) {
      return res.json({ success: false, msg: "Resume not uploaded" });
    }

    if (
      files.recommendation &&
      !files.recommendation.every((file) => file.originalname.match(/ID_\d+/))
    ) {
      return res.json({
        success: false,
        msg: "Recommendation file names should be in the format ID_<number>",
      });
    }

    if (files.recommendation && files.recommendation.length > 5) {
      return res.json({
        success: false,
        msg: "Only 5 recommendations can be uploaded at max",
      });
    }

    if (files.resume) {
      application.resume = files.resume[0].path;
    }

    // console.log(files.recommendation);

    if (files.recommendation) {
      application.recommendation = files.recommendation.map(
        (file) => file.path
      );

      for (let recommendation of files.recommendation) {
        let sender = recommendation.originalname.match(/ID_\d+/);
        let rec = new Recommendation({
          user: user,
          blob: recommendation.path,
          from: sender[0],
        });

        await rec.save();
      }
    }

    await application.save();

    res.json({ success: true });

    var role = await Role.findOne({ name: application.role });
    var ideal_skills = role.expectations;

    let recommendations = await Recommendation.find({ user: user });
    let recommendation_cycles = recommendations.map((rec) => rec.circular);
    let cycle_count = 0;
    for (let cycle of recommendation_cycles) {
      if (cycle) {
        cycle_count++;
      }
    }

    // call the ML pipeline
    // fetch("http://localhost:5000/user_analysis", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     "name": application.name,
    //     "role": application.role,
    //     "resume": application.resume,
    //     "recommendation": application.recommendation,
    //     "ideal_skills_list": ideal_skills,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then(async (data) => {
    //     console.log(data);
    //     application.skillScore = data.skills_relevance_score;
    //     application.skillTrust = data.skills_trust_score;
    //     application.experienceAccuracy = data.experience_vagueness_score;
    //     application.experienceConsistency = data.timeline_analysis;
    //     application.recoScore = data.reco_sentiment_score;
    //     application.recoTrust = data.reco_trust_score;

    //     application.finalScore = (2*application.skillScore - 0.5*application.skillTrust - 0.2*application.experienceAccuracy + 1.5*application.recoScore - cycle_count - 0.75*application.recoTrust) * 100 / 15;

    //     await application.save();
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  });
};

module.exports = {
  getRoles,
  createRole,
  getApplicationsByRole,
  getApplicationByUser,
  createApplication,
  uploadFiles,
};
