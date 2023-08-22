import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import undetected_chromedriver as uc
import time
mass = []
driver = uc.Chrome()
driver.get('https://www.dns-shop.ru/catalog/17a89aab16404e77/videokarty/?price=16001-31000%2C31001-49000%2C49001-299999&brand=asrock-asus-gigabyte-msi-palit&f%5B14xf7%5D=1wf2p7')
time.sleep(5)
# click= driver.find_element(By.CLASS_NAME, 'button-ui.button-ui_white.product-characteristics__expand').click()
# time.sleep(5)
prod= driver.find_element(By.CLASS_NAME, 'catalog-product__rating.ui-link.ui-link_black').get_attribute('data-rating')
mass.append(prod)
print(mass)