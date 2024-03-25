import requests
from bs4 import BeautifulSoup

url = "https://worldplacestour.com/learn/by-shape/learn-the-country-shapes"

html = requests.get(url)
print(html.text)
