const Place = require("../models/Place");

const createSinglePlace = async (req, res) => {
  const place = {
    owner: req.body.ownerId,
    title: req.body.title,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    pricePerNight: req.body.pricePerNight,
    description: req.body.description,
    perks: req.body.perks,
    additionalInfo: req.body.additionalInfo,
    checkin: req.body.checkin,
    checkout: req.body.checkout,
    maxGuest: req.body.maxGuest,
    photos: req.body.addedPhotos,
  };

  // create user in db
  const createdPlace = await Place.create(place);

  res.json(createdPlace);
};

const getAllPlaces = async (req, res) => {
  try {
    // find the place
    const allPlaces = await Place.find({});
    // if (!placeDetails) throw new Error("no places found!");
    res.json(allPlaces);
  } catch (error) {
    res.status(422).json(error.message ? error.message : error);
  }
};

const getSinglePlace = async (req, res) => {
  try {
    const { id } = req.params;
    // find the place
    const placeDetails = await Place.findById(id);
    // if (!placeDetails) throw new Error("no places found!");
    res.json(placeDetails);
  } catch (error) {
    res.status(422).json(error.message ? error.message : error);
  }
};

const getAllPlacesByOwner = async (req, res) => {
  try {
    const { userId } = req.params;
    const places = await Place.find({ owner: userId });
    if (!places) throw new Errro("No Places found");
    res.json(places);
  } catch (error) {
    res.status(422).json(error.message ? error.message : error);
  }
};

const updateSinglePlace = async (req, res) => {
  const place = {
    owner: req.body.ownerId,
    title: req.body.title,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    pricePerNight: req.body.pricePerNight,
    description: req.body.description,
    perks: req.body.perks,
    additionalInfo: req.body.additionalInfo,
    checkin: req.body.checkin,
    checkout: req.body.checkout,
    maxGuest: req.body.maxGuest,
    photos: req.body.addedPhotos,
  };

  // find the place so we can compare the owner to the
  // owner requesting the PUT request
  const foundPlace = await Place.findById(placeId);

  // update only if owner owns the place that needs to be updated
  if (foundPlace.owner.toString() === ownerId) {
    const updatedPlace = await Place.updateOne({ _id: placeId }, { place });
    res.json(updatedPlace);
  } else {
    res.status(422).json("could not update place");
  }
};

module.exports = {
  createSinglePlace,
  getAllPlaces,
  getSinglePlace,
  getAllPlacesByOwner,
  updateSinglePlace,
};
