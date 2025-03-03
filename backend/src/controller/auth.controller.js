import User from "../models/user.model";
export const authCallback = async (req, res) => {
    try {
        const { id, firstName, lastName, imageUrl} = req.body;

        //check if user already exists
        const user = await User.findOne({clerkId: id})
        if(!user){
            await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl
            })
        }

        res.status(200).json({ success: true, message: "User created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
}