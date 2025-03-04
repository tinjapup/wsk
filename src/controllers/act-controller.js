import { findActivities } from "../models/act-model.js";

const getActivities = async (req, res) => {
  console.log("getactivityById test", req.body.activity_id);
  console.log("req.user", req.userId);
  console.log("req.headers", req.headers.id);

  let activity;

  if (req.body.activity_id === 0) {
    activity = await findActivities(req.userId);
  } else {
    activity = await findActivities(req.userId, req.headers.id);
    console.log(activity);
  }

  if (activity) {
    res.json(activity);
  } else {
    res.sendStatus(404);
  }
};

export {getActivities};
