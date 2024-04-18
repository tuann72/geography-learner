from flask import Flask, jsonify
from flask_cors import CORS
from soupScraper import getCountryFlags

# app instance
app = Flask(__name__)
CORS(app)


@app.route("/api/flags", methods=["GET"])
def return_home():
    return getCountryFlags()


if __name__ == "__main__":
    app.run(debug=True, port=8080)
