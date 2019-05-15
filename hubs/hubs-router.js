const express = require("express");

const Hubs = require("./hubs-model.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const hubs = await Hubs.find(req.query);
    res.status(200).json(hubs);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the hubs"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const hub = await Hubs.findById(req.params.id);

    if (hub) {
      res.status(200).json(hub);
    } else {
      // this else block prevents the error of `Cannot set header after they are sent to the client`
      res.status(404).json({ message: "Hub not found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the hub"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const hub = await Hubs.add(req.body);
    res.status(201).json(hub);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error adding the hub"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Hubs.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The hub has been nuked" });
    } else {
      res.status(404).json({ message: "The hub could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error removing the hub"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const hub = await Hubs.update(req.params.id, req.body);
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: "The hub could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error updating the hub"
    });
  }
});

router.get("/:id/messages", async (req, res) => {
  try {
    const messages = await Hubs.findHubMessages(req.params.id);

    if (messages.length > 0) {
      res.status(200).json(messages);
    } else {
      res.status(404).json({ message: "No messages for this hub" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error retrieving the messages for the hub" });
  }
});

router.post("/:id/messages", async (req, res) => {
  const messageInfo = { ...req.body, hub_id: req.params.id };
  try {
    const message = await Hubs.addMessage(messageInfo);
    res.status(201).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding the message" });
  }
});

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub
module.exports = router;
