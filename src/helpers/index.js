const crypto = require("crypto");
const { validationResult } = require("express-validator");
const { error } = require("./response");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { getLoginTokenFromRequest } = require("../models/UserToken");
const md5 = (string) => {
  return crypto.createHash("md5").update(string).digest("hex");
};
const validate = (validations) => {
  return async (req, res, next) => {
    await validations.reduce(async (promise, validation) => {
      await promise;
      return validation.run(req);
    }, Promise.resolve());

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const errorsArray = errors.array();
    res.json(error(errorsArray[0].msg, errorsArray));
  };
};

const validatePasswordStrength = (password) => {
  const valid =
    password.length >= 8 &&
    password.match(/[0-9]+/) &&
    password.match(/[a-z]+/) &&
    password.match(/[A-Z]+/) &&
    password.match(/[!@#$%^&*]+/);
  if (!valid)
    throw new Error(
      "Password must contain at least 8 characters, including numbers, a special characters(!@#$%^&*), an uppercase character and a lowercase character."
    );
  return valid;
};

const generateToken = (userId) => {
  return uuidv4(userId + Date.now());
};

const uploadImage = async ({ image, directoryPath, req }) => {
  const { userId } = await getLoginTokenFromRequest(req);
  const fileName = image?.md5 + userId + +new Date();
  const extension = path.extname(image.name);
  await image.mv(directoryPath + fileName + extension);
  return fileName + extension;
};

module.exports = {
  md5,
  validate,
  validatePasswordStrength,
  generateToken,
  uploadImage,
};
