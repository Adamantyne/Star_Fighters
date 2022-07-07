import { Request, Response } from "express";

import fightServices from "../services/fightServices.js";
import fightersRepository from "../repositories/fightersRepository.js";

export async function battle(req: Request, res: Response) {
  const {
    firstUser: user1,
    secondUser: user2,
  }: { firstUser: string; secondUser: string } = req.body;

  const stargazers1 = await fightServices.getStargazers(user1);
  const stargazers2 = await fightServices.getStargazers(user2);
  const result = await fightServices.battling(stargazers1, stargazers2, user1, user2);

  return res.status(201).send(result);
}
export async function ranking(req: Request, res: Response) {
    const {rows} = await fightersRepository.getRanking();
    const fighters = {...rows}
    res.status(200).send(fighters);
}
