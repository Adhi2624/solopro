const Student = require('../models/student');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerStudent = async (req, res) => {
    try {
        const { email, password, ...studentDetails } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const student = new Student({
            userId: user._id,
            email,
            ...studentDetails,
        });

        await student.save();

        const payload = {
            user: { id: user.id },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error('Error in registerStudent:', err.message);
        res.status(500).send('Server error');
    }
};
