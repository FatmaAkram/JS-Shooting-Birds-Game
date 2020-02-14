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
        users[currentPlayerId].score = this.score;
        localStorage.setItem("users", JSON.stringify(users));
    }
}
export {
    Player
};
