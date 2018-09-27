""" includes """

USER_INCLUDES = [
    '-password'
]

ACTIVITY_INCLUDES = [
    "activity",
    {
        "key": "recommendation",
        "sub_joins": [
            "title",
            "content"
        ]
    },
]