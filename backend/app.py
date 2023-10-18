from flask import Flask
import requests

app = Flask(__name__)

@app.route("/")
def get_items():
    query = """
    {
    tasks {
        name
        objectives {
        ... on TaskObjectiveItem {
            type
            count
            item {
            name
            }
        }
        ... on TaskObjectiveBuildItem {
            type
            item {
            name
            }
        }
        ... on TaskObjectiveUseItem {
            type
            description
            count
        }
        }
    }
    hideoutStations {
        levels {
        itemRequirements {
            item {
            name
            }
            count
        }
        }
    }
    }
    """
    headers = {"Content-Type": "application/json"}
    response = requests.post('https://api.tarkov.dev/graphql', headers=headers, json={'query': query})
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception("Query failed to run by returning code of {}. {}".format(response.status_code, query))