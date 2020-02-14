class Player {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }
    get Name() {
        return this.name;
    }
    set Name(playerName) {
        this.name = playerName;
    }
    get Score() {
        return this.score;
    }
    set Score(playerScore) {
        this.score = playerScore;
    }
    saveData(users, currentPlayerId) {
        //        let playerScore = {};
        console.log(users + " " + currentPlayerId);
        users[currentPlayerId].score = this.score;
        //        playerScore["score"] = ;
        //        //    console.log(currentPlayerInfo);
        //        users[prevPlayerIndex].score = this.score;
        //        localStorage.setItem("users", users);
        //        localStorage.setItem(this.name, JSON.stringify(playerScore));
        localStorage.setItem("users", JSON.stringify(users));
//        localStorage.setItem("currentPlayer", "");
//        localStorage.removeItem("currentPlayer");


    }
}
export {
    Player
};
