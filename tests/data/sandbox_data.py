""" sandbow """

# USERS
users_data = [
    {
        "username": "John",
        "email": "john@john.com",
        "password": "testpsswd"
    }
]

# FOOTPRINTS
footprints_data = [
    {
        "type": {
            "label": "total"
        },
        "value": 2340,
    },
    {
        "type": {
            "label": "carbon"
        },
        "value": 540,
    },
    {
        "type": {
            "label": "water"
        },
        "value": 1200,
    },
    {
        "type": {
            "label": "waste"
        },
        "value": 600,
    }
]

# RECOMMENDATIONS
recommendations_data = [
    {
        "title": "Prends ton vélo",
        "content": "Un vélo ça polue vraiment moins qu'une voiture quand même !",
        "estimated_success_time": 20,
        "difficulty_level": 2,
        "benefit": 60,
        "type": "carbon"
    },
    {
        "title": "Prends une douche",
        "content": "Arrêtes les bains et prends des douches parce que c'est mieux !",
        "estimated_success_time": 3,
        "difficulty_level": 1,
        "benefit": 120,
        "type": "water"
    },
    {
        "title": "Achète du verre non teinté",
        "content": "C'est le seul verre qui est recyclable !",
        "estimated_success_time": 7,
        "difficulty_level": 2,
        "benefit": 30,
        "type": "waste"
    },
]
