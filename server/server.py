from flask import Flask, jsonify
from flask_cors import CORS
from scraper import getCountryFlags

# app instance
app = Flask(__name__)
CORS(app)


@app.route("/api", methods=["GET"])
def return_home():
    return jsonify({"message": "Hello world"})


if __name__ == "__main__":
    app.run(debug=True, port=8080)
