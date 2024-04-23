from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time
import pprint

# Set up the options for the driver
options = Options()
options.add_experimental_option("detach", True)

# Set up the driver
driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()), options=options
)

URL = "https://worldplacestour.com/learn/by-shape/learn-the-country-shapes"


def intializeScraper():
    driver.get(URL)
    areaSelection("america")
    scrapeCountryInfo()


def areaSelection(area):

    # Clicks on button depending on inputted area.

    if area == "america":
        americaBtn = driver.find_element(By.XPATH, "//span[text()='Americas']")
        americaBtn.click()
    if area == "africa":
        africaBtn = driver.find_element(By.XPATH, "//span[text()='Africa']")
        africaBtn.click()
    if area == "asia":
        asiaBtn = driver.find_element(By.XPATH, "//span[text()='Asia']")
        asiaBtn.click()
    if area == "europe":
        europeBtn = driver.find_element(By.XPATH, "//span[text()='Europe']")
        europeBtn.click()
    if area == "oceania":
        oceaniaBtn = driver.find_element(By.XPATH, "//span[text()='Oceania']")
        oceaniaBtn.click()


def scrapeCountryInfo():
    # Holds the country names (may contain errors)
    countryName = []
    # Holds the country shapes (may contain errors)
    countryShape = []

    # These variables hold the corrected versions of the list.
    countryNameFix = []
    countryShapeLinks = []

    # The dict that maps country name to country img link
    countryDict = {}

    # find elements contains shape-name
    countryName = driver.find_elements(By.XPATH, "//a[@class='shape-name']")
    # find elements containing shape-size (shape link)
    countryShape = driver.find_elements(By.XPATH, "//img[@class='shape-size']")
    for index in range(len(countryName)):
        name = countryName[index].text

        # if no errors, we look for name and shape link
        if name != "":
            countryNameFix.append(name)
            countryShapeLinks.append(countryShape[index].get_attribute("src"))

    # create new dict entry
    for index in range(len(countryNameFix)):
        countryDict[countryNameFix[index]] = countryShapeLinks[index]

    pprint.pprint(countryDict)


def compileData():
    pass


intializeScraper()
