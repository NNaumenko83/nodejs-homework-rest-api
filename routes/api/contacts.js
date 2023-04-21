const express = require("express");

const ctrl = require("../../controllers/contacts");
const {
  validateBody,
  isValidId,
  isValidFavoriteBody,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  isValidFavoriteBody,
  validateBody(schemas.updateStatusContactSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

module.exports = router;
