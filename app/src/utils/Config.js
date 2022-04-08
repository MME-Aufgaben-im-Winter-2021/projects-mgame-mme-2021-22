const Config = {
    GAME_SESSION_ID: "default",
    SESSIONS_COLLECTION_ID: "62248d05d88cb88edf41",
    MIN_ROUNDS: 3,
    MAX_ROUNDS: 6, // also default
    MIN_ROUND_DURATION: 60, //also default
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
    ILLEGAL_NAME_ERROR: "Dude, you cant use that name.",
    CONNECTION_LOST_ERROR: "You lost connection to the game session.",
    CONNECTION_UNSTABLE_WARNING: "Your connection to the game session is unstable/was interrupted.",
    // MEME JSON
    MAX_JSON_SEARCH_STARTPOINT: 1300,

};
Object.freeze(Config);

export default Config;