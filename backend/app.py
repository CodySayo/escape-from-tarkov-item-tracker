from flask import Flask, request
from flask_cors import CORS
import requests
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import bcrypt
import json

cred = credentials.Certificate("serviceAccountKey.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()

doc_ref = db.collection("users").document("howpos")
doc_ref.set({})

app = Flask(__name__)
CORS(app)

# @app.route("/post", )

@app.route("/", methods=["POST"])
def get_items():
    email = request.get_json()["user"]
    encodedEmail = email.encode("utf-8")
    hashed = bcrypt.hashpw(encodedEmail, bcrypt.gensalt())
    doc_ref = db.collection("users").document("alovelace")
    docs = doc_ref.get()
    print(hashed)
    print(docs.to_dict())

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
        combinedResponse = response.json() 
        combinedResponse["userdata"] = docs.to_dict() if docs.exists else "{}"
        return combinedResponse
    else:
        raise Exception("Query failed to run by returning code of {}. {}".format(response.status_code, query))