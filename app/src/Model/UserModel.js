class User {
    constructor(name, lobbyId){
        this.name = name;
        this.lobbyId = lobbyId;
        this.memeStories = [];
        this.points = 0;
        this.isHost = false;

    } 
}
export default User;