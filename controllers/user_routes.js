const express = require('express');
const pool = require('../configs/db_conn');
const Router = express.Router()

// Routes..
Router.post('/post', async (req, res) => {
    try {
        // await
        console.log(req.body)
        const { name } = req.body
        const newOrg = await pool.query(
            "INSERT INTO org (name) VALUES ($1) RETURNING *", // returning * lets us see the data in the json response
            [name]
        ) 
        res.json(newOrg.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

Router.get('/get-all', async (req, res) => {
    try {
        const allOrgs = await pool.query("SELECT * FROM org")
        res.json(allOrgs.rows)
    } catch (err) {
        console.error(err.message)
    }
})

Router.get('/get/:id', async (req, res) => {
    console.log(req.params)
    const { id } = req.params
    try {
        const org = await pool.query("SELECT * FROM org WHERE org_id = $1", [id]) 
        // $1 is a placeholder, then the 2nd argument is what that variable is 
        //going to be
        res.json(org.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

Router.patch('/update/:id', async (req, res) => {
    try {
        const { id } = req.params // where
        const { name } = req.body // grab the new info
        const updateOrg = await pool.query(
            "UPDATE org SET name = $1 WHERE org_id = $2", [name, id]
        )
        res.json(updateOrg)
    } catch (err) {
        console.error(err.message)
    }
})


Router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteOrg = await pool.query(
            "DELETE FROM org WHERE org_id = $1", [id]
        )
        res.json('The organization was deleted')
    } catch (err) {
        console.error(err.message)
    }
})


module.exports = Router;
