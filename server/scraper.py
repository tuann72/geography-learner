import requests
from bs4 import BeautifulSoup
from urllib.parse import unquote

url = "https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)"
html = requests.get(url)
headers = {
    "User-Agenet": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
}

soup = BeautifulSoup(html.content, "html.parser")


def getCountryFlags():
    flagDict = {}

    table = soup.find("caption").parent
    rows = table.find_all("tr")

    for row in rows[1:]:
        try:
            # Find's the src link for the image.
            src = row.td.span.span.span.img["src"]

            part = src.split(".svg")[0]
            clean = part.replace("thumb/", "")
            stripped = clean.strip("//")
            flag_link = "https://{}.svg".format(stripped)

            flag_name = flag_link.split("Flag_of_")[1].split(".svg")[0]

            if "_the_" in flag_name:
                flag_name = flag_name.replace("_the_", " ")

            flag_name = unquote(flag_name).replace("_", " ").split("(")[0]
            flag_name = flag_name.replace("the ", "")

            flagDict[flag_name] = flag_link

            # The code below downloads all the flag images.

            # filename = img.split("/")[-1]

            # flag = requests.get(img, headers=headers)
            # if flag.status_code != 200:
            #     print("Error getting {}".format(filename))
            # else:
            #     with open(filename, "wb") as file:
            #         noop = file.write(flag.content)
            #         print("Saved {}".format(filename))

        # Exception catches any cases where there is not a proper map row
        except:
            pass
    return flagDict


print(getCountryFlags())
