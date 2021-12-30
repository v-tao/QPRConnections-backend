const express = require("express"),
    router = express.Router();
const pool = require("../pool");

////////// GET USERS //////////
router.get("/", (req, res) => {
    let sql = `
    SELECT * FROM users 
    WHERE
    gender IN ${req.user.interstedGenders}
    `
})

////////// GET USER //////////
router.get("/:id", (req, res) => {
    let sql = `SELECT * FROM users WHERE id=?`
    pool.query(sql, [req.params.id], (err, result) => {
        if(err) throw err;
        res.json(result);
    });
})

////////// UPDATE USER //////////
router.put("/:id", (req, res) => {
    let sql = `
    UPDATE users
    SET
    \`name\`=?,
    gender=?,
    interestedGenders=?,
    location=POINT(?, ?),
    distance=?,
    about=?,
    okActions=?,
    notOkActions=?
    WHERE id=?
    `
    let queryValues = [
        req.body.name, 
        req.body.gender, 
        req.body.interestedGenders, 
        req.body.location[0], req.body.location[1],
        req.body.distance,
        req.body.about,
        req.body.okActions,
        req.body.notOkActions,
        req.params.id
    ]
    pool.query(sql, queryValues, (err, result) => {
        if (err) throw err;
        res.send("Account successfully updated.");
    })
});

router.delete("/:id/delete", (req, res) => {
    let sql = `DELETE FROM users WHERE id=?`;
    pool.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send("Account succesfully deleted.");
    })
})

module.exports = router;