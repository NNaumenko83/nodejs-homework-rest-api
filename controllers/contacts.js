const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-crearedAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");

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
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

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

const updateStatusContact = async (req, res) => {
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
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
