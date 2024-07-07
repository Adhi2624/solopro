const Mentor = require('../models/Mentor'); // Adjust the path as necessary

// Create a new mentor
const createMentor = async (req, res) => {
  const { userId, name, phone, email, linkedin, areaOfExpertise, experience, profileImage, institution, nativePlaceOrWork, proofImage, availableToMentor, mentorshipCount } = req.body;

  try {
    const newMentor = new Mentor({
      userId,
      name,
      phone,
      email,
      linkedin,
      areaOfExpertise,
      experience,
      profileImage,
      institution,
      nativePlaceOrWork,
      proofImage,
      availableToMentor,
      mentorshipCount,
    });

    const savedMentor = await newMentor.save();
    res.status(201).json(savedMentor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read all mentors
const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find().populate('userId', 'username'); // Assuming 'username' is a field in User model
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a mentor
const updateMentor = async (req, res) => {
  const { id } = req.params;
  const { userId, name, phone, email, linkedin, areaOfExpertise, experience, profileImage, institution, nativePlaceOrWork, proofImage, availableToMentor, mentorshipCount } = req.body;

  try {
    const updatedMentor = await Mentor.findByIdAndUpdate(
      id,
      {
        userId,
        name,
        phone,
        email,
        linkedin,
        areaOfExpertise,
        experience,
        profileImage,
        institution,
        nativePlaceOrWork,
        proofImage,
        availableToMentor,
        mentorshipCount,
      },
      { new: true }
    );

    if (!updatedMentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    res.status(200).json(updatedMentor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a mentor
const deleteMentor = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMentor = await Mentor.findByIdAndDelete(id);

    if (!deletedMentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    res.status(200).json({ message: 'Mentor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMentor,
  getMentors,
  updateMentor,
  deleteMentor,
};
