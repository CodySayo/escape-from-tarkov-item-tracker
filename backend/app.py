from flask import Flask, request
from flask_cors import CORS
import requests
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
import hashlib

cred = credentials.Certificate("serviceAccountKey.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()

doc_ref = db.collection("users").document("howpos")
doc_ref.set({})

app = Flask(__name__)
CORS(app)

@app.route("/updateItemCount", methods=["POST"])
def update_DB():
    body = request.get_json()
    email = body["user"]
    shortName = body["shortName"]
    count = body["count"]

    encodedEmail = email.encode("utf-8")
    hashed = str(int(hashlib.md5(encodedEmail).hexdigest(), 16))
    user_ref = db.collection("users").document(hashed)
    user_ref.set({shortName: count}, merge=True)

    return "200"

@app.route("/", methods=["POST"])
def get_items():
    email = request.get_json()["user"]
    if email != "":
        encodedEmail = email.encode("utf-8")
        hashed = str(int(hashlib.md5(encodedEmail).hexdigest(), 16))
        user_ref = db.collection("users").document(hashed)
        user = user_ref.get()
        if not user.exists:
            db.collection("users").document(hashed).set({})
        user_ref = db.collection("users").document(hashed)
        user = user_ref.get()

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
            name
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
        combinedResponse["userdata"] = user.to_dict() if email != "" else {}
        print(combinedResponse)
        return combinedResponse
    else:
        raise Exception("Query failed to run by returning code of {}. {}".format(response.status_code, query))