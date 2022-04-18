const { Course } = require("../../db/models");
const { setOrGetCache } = require("../../utils/feature");
const cloudinary = require("../../config/cloud/cloudinary");

exports.getAll = async (req, res) => {
  try {
    // let CourseList = await setOrGetCache("courses", async () => {
    const courses = await Course.findAll();
    //   return courses;
    // });

    res.status(200).json({
      error: false,
      courses: courses,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};

exports.getDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(400).json({
        error: true,
        msg: "không tìm thấy",
      });
    } else {
      return res.status(200).json({
        error: false,
        course,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};

exports.active = async (req, res) => {
  try {
    const { courseId } = req.params;
    await Course.update({ verified: 1 }, { where: { id: courseId } });

    return res.status(200).json({
      error: false,
      msg: "updated",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};

exports.suspend = async (req, res) => {
  try {
    const { courseId } = req.params;
    await Course.update({ verified: 0 }, { where: { id: courseId } });

    return res.status(200).json({
      error: false,
      msg: "updated",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};

exports.edit = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { name, description } = req.body;
    const course = {
      name,
      description,
    };

    if (req.file !== undefined) {
      let { imageUrl } = course;
      if (imageUrl) {
        await cloudinary.uploader.destroy(imageUrl.split(" ")[1]);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "courses",
      });

      course.imageUrl = `${result.secure_url} ${result.public_id}`;
    }
    await Course.update(course, { where: { id: courseId } });
    return res.status(200).json({
      error: false,
      msg: "Updated!",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};

exports.create = async (req, res) => {
  try {
    const course = {
      categoryId: req.params.categoryId,
      name: req.body.name,
      description: req.body.description,
      instructorId: req.user.id,
    };
    if (req.file !== undefined) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "courses",
      });
      course.imageUrl = `${result.secure_url} ${result.public_id}`;
    }
    await Course.create(course);
    return res.status(200).json({
      error: false,
      course: course,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};

exports.delete = async (req, res) => {
  try {
    const { courseId } = req.params;
    let { imageUrl } = await Course.findByPk(courseId, {
      attributes: ["imageUrl"],
    });
    if (imageUrl) {
      await cloudinary.uploader.destroy(imageUrl.split(" ")[1]);
    }
    await Course.destroy({ where: { id: courseId } });
    return res.status(200).json({
      error: false,
      msg: "Delete course successfully!",
    });
  } catch (error) {
    console.log(error).message;
    res.status(500).send("Server error");
  }
};
