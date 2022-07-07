import axios from "axios";

import fightersRepository from "../repositories/fightersRepository.js";

async function getStargazers(username: string) {
  try {
    let stargazers = 0;
    console.log(stargazers)
    const { data } = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    data.forEach((repository) => {
      stargazers += repository.stargazers_count;
    });
    return stargazers;
  } catch (error) {
    //console.log(error);
  }
}

async function insertFighter(username: string) {
  const { rows: fighter } = await fightersRepository.getFightersByUsername(
    username
  );
  if (!fighter[0]) {
    await fightersRepository.insertFighter(username);
  }
}

async function battling(
  stargazers1: number,
  stargazers2: number,
  user1: string,
  user2: string
) {
  await insertFighter(user1);
  await insertFighter(user2);
  let winner = "";
  let loser = "";
  let draw = false;
  if (stargazers1 === stargazers2) {
    winner = null;
    loser = null;
    draw = true;
  } else {
    winner = stargazers1 > stargazers2 ? user1 : user2;
    loser = stargazers1 < stargazers2 ? user1 : user2;
  }
  await fightersRepository.updateResult(winner,loser,draw,user1,user2);
  return {
    winner,
    loser,
    draw,
  };
}

const fightServices = { getStargazers, battling };
export default fightServices;
