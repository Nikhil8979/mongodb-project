function success(message, data) {
  return {
    data,
    type: "success",
    message,
  };
}

function error(message, errors = [], data = null) {
  return {
    data,
    errors,
    message,
    type: "error",
  };
}

function response(data, message = "success") {
  return {
    data,
    type: "success",
    message,
  };
}

const wrapRequestHandler = (fn) => (req, res, next) =>
  fn(req, res, next).catch(next);

const messages = () => {
  return {
    logged_in: "Logged In",
    user_not_found: "User does not exist",
    invalid_password: "Invalid Password",
  };
};

module.exports = {
  success,
  error,
  response,
  wrapRequestHandler,
  messages,
};
