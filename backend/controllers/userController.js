const User = require('../models/user');
const Student = require('../models/student');
const Mentor = require('../models/mentor');
const Investor = require('../models/investor');

const signup = async (req, res) => {
  const { Email, Password, userType, ...userData } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create user in user collection
    const user = new User({ Email, Password });
    await user.save();

    // Create user profile based on user type
    let profileData;
    switch (userType) {
      case 'student':
        profileData = new Student(userData);
        break;
      case 'mentor':
        profileData = new Mentor(userData);
        break;
      case 'investor':
        profileData = new Investor(userData);
        break;
      default:
        return res.status(400).json({ message: 'Invalid user type' });
    }
    profileData.user = user._id;
    await profileData.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  signup,
};
