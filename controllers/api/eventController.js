const router = require("express").Router();
const { Event } = require("../../models");

router.get("/", (req, res) => {
  Event.findAll()
    .then((events) => {
      res.json(events);
    })
    .catch((err) => {
      res.status(500).json({ msg: "an error occured.", err });
    });
});

// Create a note based on data passed through
router.post("/", async (req, res) => {
  try {
    const eventData = await Event.create({
      ...req.body,
    });

    res.status(200).json(eventData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a note based on where it was clicked/the id
router.delete("/:id", async (req, res) => {
  Event.destroy({ where: req.params.id })
    .then((delEvent) => {
      if (delEvent === 0) {
        return res.status(404).json({ msg: "No event found." });
      }
      res.json(delEvent);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

module.exports = router;
