const router = require("express").Router();

const {postuserdetails,getAllUserList,deleteUser,updateUserInfo,singleUser} = require("../controller/user");


router.post("/postuser",postuserdetails);
router.get("/getuserlist",getAllUserList);
router.delete("/deleteuser/:id",deleteUser);
router.put("/updateuser/:id",updateUserInfo);

//to get single user

router.get("/singleuser/:id",singleUser);




module.exports = router;
