const Student = require('../models/Student'); // Adjust the path as necessary

// Create a new student
const createStudent = async (req, res) => {
  const { userId, name, phone, email, linkedin, git, collegeName, course, collegeLocation, collegeIdPhoto, profileImage, institution, nativePlaceOrWork } = req.body;

  try {
    const newStudent = new Student({
      userId,
      name,
      phone,
      email,
      linkedin,
      git,
      collegeName,
      course,
      collegeLocation,
      collegeIdPhoto,
      profileImage,
      institution,
      nativePlaceOrWork,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('userId', 'username'); // Assuming 'username' is a field in User model
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a student
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { userId, name, phone, email, linkedin, git, collegeName, course, collegeLocation, collegeIdPhoto, profileImage, institution, nativePlaceOrWork } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        userId,
        name,
        phone,
        email,
        linkedin,
        git,
        collegeName,
        course,
        collegeLocation,
        collegeIdPhoto,
        profileImage,
        institution,
        nativePlaceOrWork,
      },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a student
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
};
