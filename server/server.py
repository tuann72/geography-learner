from flask import Flask
from flask_cors import CORS
from soupScraper import getCountryFlags
from seleniumScraper import intializeScraper


# app instance
app = Flask(__name__)
CORS(app)


@app.route("/api/flags", methods=["GET"])
def return_flags():
    return getCountryFlags()


@app.route("/api/shapes", methods=["GET"])
def return_shapes():
    return intializeScraper()


if __name__ == "__main__":
    app.run(debug=True, port=8080)
