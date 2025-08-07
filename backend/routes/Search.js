const express = require("express");
const router = express.Router();
const Search = require("../models/Search");
const planetData = require("../data/planetData");

console.log("PlanetData Keys:", Object.keys(planetData)); // <---- ADD THIS

// reusing your existing data

// Get bodies between source and destination
router.post("/", async (req, res) => {
  console.log("Request body:", req.body);

  const { source, destination } = req.body;
  console.log("SOURCE:", source);
  console.log("DESTINATION:", destination);

  const allBodies = [
    "mercury",
    "venus",
    "earth",
    "moon",
    "mars",
    "jupiter",
    "europa",
    "ganymede",
    "saturn",
    "titan",
    "uranus",
    "neptune",
    "pluto",
    "iss",
    "hubble",
    "vesta",
    "pallas",
    "eros",
    "itokawa",
    "bennu",
  ];

  console.log("All bodies:", allBodies);

  const startIndex = allBodies.indexOf(source.toLowerCase());
  const endIndex = allBodies.indexOf(destination.toLowerCase());

  console.log("Start index:", startIndex, "End index:", endIndex);

  if (startIndex === -1 || endIndex === -1) {
    console.log("Received:", source, destination);
    console.log("Source index:", allBodies.indexOf(source.toLowerCase()));
    console.log(
      "Destination index:",
      allBodies.indexOf(destination.toLowerCase())
    );

    return res.status(400).json({ error: "Invalid source or destination" });
  }

  const from = Math.min(startIndex, endIndex);
  const to = Math.max(startIndex, endIndex);
  const resultBodies = allBodies.slice(from + 1, to);

  const search = new Search({ source, destination, resultBodies });
  await search.save();

  res.json({ resultBodies });
});

module.exports = router;
