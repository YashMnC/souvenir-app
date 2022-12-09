// import jwt from "jsonwebtoken";

// const auth = async (req, res, next) => {
//   try {
//     const token = req?.headers?.authorization?.split(" ")[1];

//     req.userId = token;

//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default auth;

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = async (req, res, next) => {
  // try {
  //   const token = req.headers.authorization.split(" ")[1];
  //   const isCustomAuth = token.length < 500;

  //   let decodedData;

  //   if (token && isCustomAuth) {
  //     decodedData = jwt.verify(token, REACT_APP_JWT_SECRET);

  //     req.userId = decodedData?.id;
  //   } else {
  //     decodedData = jwt.decode(token);

  //     req.userId = decodedData?.sub;
  //   }

  //   next();
  // } catch (error) {
  //   console.log(error);
  // }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("unauthorized");
      return res.status(400).send("Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    const isCustomToken = token?.length < 500;

    let decodedData;

    if (token && isCustomToken) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (e) {
    console.log(e);
  }
};

export default auth;
