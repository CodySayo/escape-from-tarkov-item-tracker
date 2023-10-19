from flask import Flask
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

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
                shortName
                gridImageLink
                wikiLink
                }
            }
            ... on TaskObjectiveBuildItem {
                type
                item {
                name
                shortName
                gridImageLink
                wikiLink

                }
            }
            ... on TaskObjectiveUseItem {
                type
                description
                count
                useAny {
                name
                shortName
                gridImageLink
                wikiLink
                }
            }
            }
        }
        hideoutStations {
            levels {
            itemRequirements {
                item {
                name
                shortName
                gridImageLink
                wikiLink
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