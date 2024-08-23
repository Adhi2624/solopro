const Entrepreneur = require('../models/Entrepreneur'); // Adjust the path as necessary
//
// Create a new entrepreneur
const createEntrepreneur = async (req, res) => {
  const { userId, name, phone, email, linkedin, areaOfExpertise, experience, profileImage, institution, nativePlaceOrWork, proofImage, startupName, startupDescription, fundingReceived } = req.body;

  try {
    const newEntrepreneur = new Entrepreneur({
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
      startupName,
      startupDescription,
      fundingReceived,
    });

    const savedEntrepreneur = await newEntrepreneur.save();
    res.status(201).json(savedEntrepreneur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read all entrepreneurs
const getEntrepreneurs = async (req, res) => {
  try {
    const entrepreneurs = await Entrepreneur.find().populate('userId', 'username'); // Assuming 'username' is a field in User model
    res.status(200).json(entrepreneurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an entrepreneur
const updateEntrepreneur = async (req, res) => {
  const { id } = req.params;
  const { userId, name, phone, email, linkedin, areaOfExpertise, experience, profileImage, institution, nativePlaceOrWork, proofImage, startupName, startupDescription, fundingReceived } = req.body;

  try {
    const updatedEntrepreneur = await Entrepreneur.findByIdAndUpdate(
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
        startupName,
        startupDescription,
        fundingReceived,
      },
      { new: true }
    );

    if (!updatedEntrepreneur) {
      return res.status(404).json({ message: 'Entrepreneur not found' });
    }

    res.status(200).json(updatedEntrepreneur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an entrepreneur
const deleteEntrepreneur = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEntrepreneur = await Entrepreneur.findByIdAndDelete(id);

    if (!deletedEntrepreneur) {
      return res.status(404).json({ message: 'Entrepreneur not found' });
    }

    res.status(200).json({ message: 'Entrepreneur deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEntrepreneur,
  getEntrepreneurs,
  updateEntrepreneur,
  deleteEntrepreneur,
};
