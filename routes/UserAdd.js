const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const cors = require("cors");
const connectDB = require("../config/DbCon");
connectDB();
router.use(cors());
router.use(express.json());

router.get('/all-users', async (req, res) => {
    try {
        const users= await UserModel.find();
        res.status(200).json({ message: "Users fetched successfully",users });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
})

router.post('/claim-points',async (req, res) => {
    const { userId, point,currentPoint } = req.body;
    console.log(userId,point);
    try{ 
       await UserModel.updateOne(
            { _id: userId }, // filter
            { $set: { totalPoints: point },
            $push: {
                pointsHistory: {
                  point: currentPoint,
                  date: new Date() // add current date/time
                }
              } // update
         } // update
          );
          const users= await UserModel.find();
          res.status(200).json({ message: "Points updated successfully",users });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
})

router.post('/add-user',async (req, res) => {
    const { name } = req.body;
    console.log(name);
    try {
        const user =await new UserModel({
            name,
            totalPoints: 0,
            pointsHistory: [],
        })
        await user.save();
        const users = await UserModel.find();
        res.status(200).json({ message: "User added successfully",user,users });            
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
})

router.post('/user',async (req, res) => {
    const { userId } = req.body;
    console.log(userId);
    try {
        const user= await UserModel.findById(userId);
        res.status(200).json({ message: "User fetched successfully",user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
})


router.get('/delete-all',async (req, res) => {
    try {
        await UserModel.deleteMany();
        res.status(200).json({ message: "All users deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;