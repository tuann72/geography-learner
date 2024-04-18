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

driver.get(URL)
