const express = require("express");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  let statusCode = 500;
  let msg = "Internal Server Error";

  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    msg = err.errors.map((error) => {
      return error.message;
    });
  } else if (err.name === "notFound") {
    statusCode = 404;
    msg = "Data Not Found";
  } else if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 400;
    msg = err.errors.map((error) => {
      return error.message;
    });
  } else if (err.name === "userOrPassNotFound") {
    statusCode = 401;
    msg = "username or password is wrong";
  } else if (err.name === "invalidToken") {
    statusCode = 401;
    msg = "Username or Password is invalid";
  } else if (err.name === "forbidden") {
    statusCode = 403;
    msg = "Forbidden Access";
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    msg = "Invalid Token";
  } else if (err.name === "notLogged") {
    statusCode = 401;
    msg = "Unauthorized";
  }
  res.status(statusCode).json({
    statusCode: statusCode,
    error: msg,
  });
};

module.exports = errorHandler;
