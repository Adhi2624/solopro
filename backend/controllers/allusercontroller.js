const getAllData = async (req, res) => {
    try {
        const db = getDB(); // Get the database object

        // Fetch data from all collections
        const students = await db.collection("students").find().toArray();
        const organizations = await db.collection("organizations").find().toArray();
        const mentors = await db.collection("mentors").find().toArray();
        const investors = await db.collection("investors").find().toArray();
        const entrepreneurs = await db.collection("entrepreneurs").find().toArray();

        console.log("Fetched students:", students.length);
        console.log("Fetched organizations:", organizations.length);
        console.log("Fetched mentors:", mentors.length);
        console.log("Fetched investors:", investors.length);
        console.log("Fetched entrepreneurs:", entrepreneurs.length);

        // Combine the results into a single array
        const combinedData = [
            ...students,
            ...organizations,
            ...mentors,
            ...investors,
            ...entrepreneurs,
        ];
        console.log(Object.keys(combinedData).length);
        console.log("Combined data length:", combinedData.length);

        // Fetch user roles
        const userRoles = await User.find({}, 'email role').exec();
        console.log("Fetched user roles:", userRoles.length);

        // Combine user roles with existing data
        const dataWithRoles = combinedData.map(item => {
            const user = userRoles.find(user => user.email === item.email);
            if (user) {
                return { ...item, role: user.role };
            }
            return item;
        });

        console.log("Data with roles length:", dataWithRoles.length);

        res.send(dataWithRoles);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getDataByName = async (req, res) => {
    try {
        const db = getDB();
        const name = req.params.name;

        // Fetch data from all collections based on name
        const student = await db.collection("students").findOne({ name });
        const organization = await db.collection("organizations").findOne({ name });
        const mentor = await db.collection("mentors").findOne({ name });
        const investor = await db.collection("investors").findOne({ name });
        const entrepreneur = await db.collection("entrepreneurs").findOne({ name });

        // Combine the results into a single response
        const combinedData = {
            student,
            organization,
            mentor,
            investor,
            entrepreneur,
        };
        
        res.json(combinedData);
        console.log(combinedData);
    } catch (error) {
        console.error("Error fetching data by name:", error);
        res.status(500).send("Internal Server Error");
    }
};
