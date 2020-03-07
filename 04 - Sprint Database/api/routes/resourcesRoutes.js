const express = require("express");

const resources = require("../controllers/resourcesController");

const router = express.Router();

const err = { error: "Server Malfunctioning" };
//GET THEM ALL
router.get("/", async (req, res) => {
  try {
    const allResources = await resources.get();
    res.status(200).json(allResources);
  } catch (error) {
    res.status(500).json(err);
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
    try {
        const resource = await resources.getById(req.params.id)
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json(err);
    }
});

// POST NEW ONE
router.post("/", async (req, res) => {
  try {
    const newResource = await resources.insert(req.body);
    res.status(200).json(newResource);
  } catch (error) {
    res.status(500).json(err);
  }
});

// EDIT
router.put("/:id", async (req, res) => {
    try {
        const editedResource = await resources.update(req.params.id,req.body)
        res.status(200).json(editedResource);
    } catch (error) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        await resources.remove(req.params.id)
        res.status(200).json({message: "Resource Deleted"});
    } catch (error) {
        res.status(500).json(err);
    }
});

module.exports = router;