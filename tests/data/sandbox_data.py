""" sandbow """

# USERS
users_data = [
    {
        "username": "John",
        "email": "john@john.com",
        "password": "testpsswd"
    },
    {
        "username": "Karl",
        "email": "karl@karl.com",
        "password": "testpsswd"
    },
    {
        "username": "Ninnie",
        "email": "ninnie@ninnie.com",
        "password": "testpsswd"
    },
    {
        "username": "Ninnie1",
        "email": "ninnie1@ninnie.com",
        "password": "testpsswd"
    },
    {
        "username": "Ninnie2",
        "email": "ninnie2@ninnie.com",
        "password": "testpsswd"
    },
    {
        "username": "Ninnie3",
        "email": "ninnie3@ninnie.com",
        "password": "testpsswd"
    },
    {
        "username": "Ninnie4",
        "email": "ninnie4@ninnie.com",
        "password": "testpsswd"
    }
]

# PROPERTY
properties_data = [
    {
        "property_name": "bath_or_shower",
    },
    {
        "property_name": "bath_shower_frequency",
    },
    {
        "property_name": "carpooling_frequency",
    },
    {
        "property_name": "clothes_composition",
    },
    {
        "property_name": "personal_vehicule_consumption",
    },
    {
        "property_name": "personal_vehicule_frequency",
    },
    {
        "property_name": "plain_frequency",
    },
    {
        "property_name": "public_transportation_frequency",
    },
    {
        "property_name": "red_meat_frequency",
    },
    {
        "property_name": "train_frequency",
    },
    {
        "property_name": "white_meat_frequency",
    },
    {
        "property_name": "yellow_garbage",
    },
]
# # Properties
# properties_data = [
#     {
#         "property_name": "Tu manges beaucoup de viandes?"
#     },
#     {
#         "property_name": "Tu prends beaucoup la voiture?"
#     },
#     {
#         "property_name": "Tu te laves?"
#
#     },
#     {
#         "property_name": "Tu chauffes ton appartement?"
#
#     },
#     {
#         "property_name": "Tu achètes local?"
#
#     },
#     {
#         "property_name": "Tu fais du vélo?"
#
#     }
# ]

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
    {
        "title": "Je pense à éteindre mon frigo pendant mes vacances",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla bibendum feugiat eleifend. Vivamus non condimentum mauris. Pellentesque venenatis mauris quis diam dapibus, at dignissim turpis commodo. Pellentesque lacinia, lorem vitae faucibus efficitur, justo nulla ornare purus, ac ultricies magna nulla vel dolor. Sed tempor finibus sapien. Donec rutrum odio mi, in tempus est sollicitudin eget. Duis mollis arcu dui, sit amet feugiat orci laoreet non. In bibendum diam nec dui aliquam maximus. Nullam ac justo sem. Curabitur at ante porta, efficitur leo in, lacinia dui. In nec lectus in mauris vulputate gravida. Suspendisse quis feugiat leo, et luctus nibh. Praesent diam felis, dignissim nec ante vitae, laoreet accumsan diam.",
        "estimated_success_time": 6,
        "difficulty_level": 2,
        "benefit": 45,
        "type": "carbon"
    },
]
