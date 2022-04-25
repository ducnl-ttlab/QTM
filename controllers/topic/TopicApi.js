const req = require("express/lib/request");
const { Topic } = require("../../db/models");
const {
  setOrGetCache,
  pagination,
  removeCache,
} = require("../../utils/feature");

exports.getAll = async (req, res) => {
  try {
    let { courseId } = req;
    const topicList = await setOrGetCache(`Topic_${courseId}`, async () => {
      let topics = await Topic.findAll({ where: { courseId } });
      return topics;
    });
    res.status(200).json({
      error: false,
      topics: topicList,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};

exports.delete = async (req, res) => {
  try {
    let { topicId } = req.params;
    let { courseId } = req;
    await Topic.destroy({ where: { id: topicId } });
    await removeCache(`Topic_${courseId}`);
    return res.status(200).json({
      error: "false",
      message: "Delete topic successfully!",
    });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

exports.edit = async (req, res) => {
  try {
    const { courseId } = req;
    const { topicId } = req.params;
    const { title, description, content } = req.body;
    const topic = {
      title,
      description,
      content,
    };

    await Topic.update(topic, { where: { id: topicId } });
    await removeCache(`Topic_${courseId}`);
    return res.status(200).json({
      error: false,
      msg: "Updated!",
    });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

exports.create = async (req, res) => {
  try {
    const { courseId } = req;
    const { title, description, content } = req.body;
    const topic = { courseId, title, description, content };
    await Topic.create(topic);
    await removeCache(`Topic_${courseId}`);
    return res.status(200).json({
      error: false,
      topic: topic,
      msg: "Create topic successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};
