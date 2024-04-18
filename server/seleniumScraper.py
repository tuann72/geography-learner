from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time

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
    areaSelection("europe")


def areaSelection(area):
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
    pass


def compileData():
    pass


intializeScraper()
