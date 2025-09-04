const express  =require("express");
const router = express.Router();



// Import controller functions
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');



//  Routs    //

//Get all users
router.get('/',getUsers);

//Get a single user by Id
router.get('/:id',getUserById);

//POST create a new user
router.post('/',createUser);


// pUT update user
router.put('/:id',updateUser);

//Delete a user
router.delete('/:id',deleteUser);


module.exports = router;