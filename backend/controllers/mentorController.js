// const { ObjectId } = require("mongodb");
// const { getDB } = require('../config/db');

// exports.getAllMentors = async (req, res) => {
//     try {
//         const db = getDB(); // Get the database object
//         const mentors = await db.collection("mentor").find().toArray();
//         res.send(mentors);
//     } catch (error) {
//         console.error("Error fetching mentors:", error);
//         res.status(500).send("Internal Server Error");
//     }
// };
// ;

// exports.getAppointmentById = async (req, res) => {
//     try {
//         const db = getDB();
//         const id = req.body._id;
//         const user = await db.collection("mentor").findOne({ _id: new ObjectId(id) });
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

const Mentor = require('../models/mentor');
const User = require('../models/user');

exports.registerMentor = async (req, res) => {
    try {
        const { email, password, ...mentorDetails } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const mentor = new Mentor({
            userId: user._id,
            email,
            ...mentorDetails,
        });

        await mentor.save();

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
