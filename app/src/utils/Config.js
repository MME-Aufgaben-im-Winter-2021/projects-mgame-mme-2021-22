const Config = {
    DOCUMENT_STORAGE_KEY: "documentId",
    TEAM_STORAGE_KEY: "teamId",
    SESSIONS_COLLECTION_ID: "62248d05d88cb88edf41",
    MIN_ROUNDS: 3,
    DEFAULT_ROUNDS: 5,
    MAX_ROUNDS: 7, 
    MIN_ROUND_DURATION: 60, 
    DEFAULT_ROUND_DURATION: 120,
    MAX_ROUND_DURATION: 250,
    RATING_DURATION: 40,
    MAX_MEMES: 3,
    HAND_SIZE: 27,
    MAX_KEYWORDS: 6,
    GOOD_AUDIO_NUM: 21,
    BAD_AUDIO_NUM: 25,
    //ERROR CODES
    LOGIN_FAILED_ERROR: "email or password are incorrect",
    NO_SUCH_SESSION_ERROR: "This game is no longer available or token is wrong.",
    GAME_NO_LONGER_AVAILABLE_ERROR: "The host has ended the session.",
    INVALID_PASSWORD_ERROR: "Password is invalid. Please choose password with at least 8 characters.",
    ILLEGAL_NAME_ERROR: "Dude, you can't use that name!",
    CONNECTION_LOST_ERROR: "You lost connection to the game session.",
    CONNECTION_UNSTABLE_WARNING: "Your connection to the game session is unstable/was interrupted.",
    HOST_ERROR: "Could not host a new game! Sry bro.",
    // MEME JSON
    MAX_JSON_SEARCH_STARTPOINT: 1300,
    //GameStates
    LOBBY_WAITING: "lobby",
    GAME_STARTED: "startedGame",
    GAME_ENDED: "gameEnd",
    ROUND_ENDED: "roundEnd",
    RATING_PHASE: "rating",
    SESSION_ENDED: "gameOver",
    //Roles
    ROLE_KEY: "role",
    HOST_ROLE: "host",
    PLAYER_ROLE: "player",
    SPECTATOR_ROLE: "spectator",

};
//Object.freeze(Config);

export default Config;