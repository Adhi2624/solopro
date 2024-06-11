// const { ObjectId } = require("mongodb");
// const { getDB } = require('../config/db');

// exports.getStudentById = async (req, res) => {
//     const id = req.body._id;
//     try {
//         const db = getDB(); // Get the database object
//         const user = await db.collection("student").findOne({ _id: new ObjectId(id) });
//         if (user) {
//             res.json(user);
//         } else {
//             res.status(404).json({ error: 'User not found' });
//         }
//     } catch (error) {
//         console.error("Error fetching user:", error);
//         res.status(500).send("Internal Server Error");
//     }
// };

const Student = require('../models/student');
const User = require('../models/user');

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
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

