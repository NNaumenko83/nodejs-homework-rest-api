// const contacts = require("../models/contacts");
const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (_, res) => {
  const result = await Contact.find();
  //   const result = await contacts.listContacts();
  res.status(200).json({ status: "success", code: 200, data: result });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ status: "success", code: 200, data: result });
};

const add = async (req, res) => {
  console.log(req.body);
  const result = await Contact.create(req.body);

  res.status(201).json({ status: "success", code: 201, data: result });
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({ message: "contact deleted", code: 200 });
};

const updateById = async (req, res) => {
  const data = req.body;

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    code: 200,
    data: result,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
};

const updateFavorite = async (req, res) => {
  const data = req.body;
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    code: 200,
    data: result,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
