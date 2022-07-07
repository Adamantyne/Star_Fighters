import db from "../database.js";

async function insertFighter(username: string) {
  return await db.query(
    `
    INSERT INTO fighters(username,wins,losses,draws)
    VALUES ($1,0,0,0)
    `,[`${username}`]
  );
}
async function getRanking() {
    return await db.query(
        `
        SELECT username,wins,losses,draws FROM fighters 
        ORDER BY wins DESC
        `
    );
}
async function getFightersByUsername(username: string) {
  return await db.query(
    `
    SELECT * FROM fighters WHERE username=$1
    `,[username]
    );
}

async function updateResult(winner: string, loser: string, draw: boolean,user1:string, user2:string) {
    if(draw){
        return await db.query(`
        UPDATE fighters SET draws = draws+1
        WHERE username=$1 AND username=$2
        `,[user1,user2]);
    }else{
        await db.query(`
        UPDATE fighters SET wins = wins+1
        WHERE username=$1
        `,[winner]);
        await db.query(`
        UPDATE fighters SET losses = losses+1
        WHERE username=$1
        `,[loser]);
        return;
    }
}

const fightersRepository = {
  insertFighter,
  getFightersByUsername,
  updateResult,
  getRanking
};

export default fightersRepository;
