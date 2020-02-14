let level = 1;
function login() {
    location.href = 'game.html';
    let newPlayer = document.querySelector("input[name=username]");
    let prevPlayers = JSON.parse(localStorage.getItem("users"));
    let checkExist = 0;
    let currentPlayer = "";
    if (prevPlayers == null) { //first time
        prevPlayers = new Array();
        let obj = {};
        obj["name"] = newPlayer.value;
        obj["score"] = 0;
        prevPlayers.push(obj);
        console.log(prevPlayers.length);
    } else {
        checkExist = prevPlayers.findIndex(player => player.name == newPlayer.value);
        if (checkExist == -1) { // If player doesn't exisy before added to users array
            let obj = {};
            obj["name"] = newPlayer.value;
            obj["score"] = 0;
            prevPlayers.push(obj);
            checkExist = prevPlayers.length - 1;
        }
    }
    currentPlayer = {};
    currentPlayer["name"] = newPlayer.value;
    currentPlayer["id"] = checkExist;
    currentPlayer["level"]=level;
    localStorage.setItem("users", JSON.stringify(prevPlayers));
    localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));
}
$("#level1").on("click",function(){
    $(this).css("opacity",1);
    $("#level2").css("opacity",.7);
    level = 1;
});
$("#level2").on("click",function(){
    $(this).css("opacity",1);
    $("#level1").css("opacity",.7);
    level = 2;
});