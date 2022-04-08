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
    
};
Object.freeze(Config);

export default Config;