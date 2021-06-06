var postPasswordScehma = {
    "id": "/postPassword",
    "type": "object",
    "properties": {
        "password": {"type": "tring"},
        "hoursToLive": {
            "type": ["integer"],
            "minimum": 1,
            "maximum": 120,
        },
        "viewsToLive": {
            "type": ["integer"],
            "minimum": 1,
            "maximum": 10,
        },
    }
}

module.exports = postPasswordScehma;