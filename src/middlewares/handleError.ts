import { NextFunction, Request, Response } from "express";

export default async function handleError(
  error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type === "Unprocessable Entity") {
    return res.status(422).send(error.message);
  } else if (error.type === "unauthorized") {
    return res.status(401).send(error.message);
  } else if (error.type === "Conflict") {
    return res.status(401).send(error.message);
  }else if(error.response.data.message==="Not Found"){
    return res.status(401).send("firstUser and secondUser must be a git user");
  }

  return res.sendStatus(500);
}
