const Investor = require('../models/Investor'); // Adjust the path as necessary

// Create a new investor
const createInvestor = async (req, res) => {
  const { userId, name, phone, email, linkedin, areaOfExpertise, experience, profileImage, institution, nativePlaceOrWork, proofImage, availableToInvest, investmentCount, investmentAmount } = req.body;

  try {
    const newInvestor = new Investor({
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
      availableToInvest,
      investmentCount,
      investmentAmount,
    });

    const savedInvestor = await newInvestor.save();
    res.status(201).json(savedInvestor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read all investors
const getInvestors = async (req, res) => {
  try {
    const investors = await Investor.find().populate('userId', 'username'); // Assuming 'username' is a field in User model
    res.status(200).json(investors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an investor
const updateInvestor = async (req, res) => {
  const { id } = req.params;
  const { userId, name, phone, email, linkedin, areaOfExpertise, experience, profileImage, institution, nativePlaceOrWork, proofImage, availableToInvest, investmentCount, investmentAmount } = req.body;

  try {
    const updatedInvestor = await Investor.findByIdAndUpdate(
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
        availableToInvest,
        investmentCount,
        investmentAmount,
      },
      { new: true }
    );

    if (!updatedInvestor) {
      return res.status(404).json({ message: 'Investor not found' });
    }

    res.status(200).json(updatedInvestor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an investor
const deleteInvestor = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedInvestor = await Investor.findByIdAndDelete(id);

    if (!deletedInvestor) {
      return res.status(404).json({ message: 'Investor not found' });
    }

    res.status(200).json({ message: 'Investor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createInvestor,
  getInvestors,
  updateInvestor,
  deleteInvestor,
};
