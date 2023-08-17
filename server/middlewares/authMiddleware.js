import JWT from "jsonwebtoken";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "You are not authorized to access this api.",
    });
    console.log(error);
  }
};

//Protected Routes token base customer
export const requireSignInCustomer = async (req, res, next) => {
  try {
    JWT.verify(req.headers.authorization1, process.env.JWT_SECRET_CUSTOMER);
    next();
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "You are not authorized to access this api.",
    });
    console.log(error);
  }
};
