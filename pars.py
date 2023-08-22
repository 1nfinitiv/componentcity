import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import undetected_chromedriver as uc
import time

category = ['SSD M.2 накопители']
goods_mass=[]
goods_dict = {'SSD M.2 накопители': []}

try:
    a =8
    url = 'https://www.dns-shop.ru/catalog/dd58148920724e77/ssd-m2-nakopiteli/'
    driver = uc.Chrome()
    driver.get(url)
    time.sleep(5)
    column=driver.find_elements(By.CLASS_NAME, 'catalog-product.ui-button-widget')
    for element in column:
        goods={'item_id':a, 'name':'','description':'', 'price':'',  'image':''}
        
        item_url = element.find_element(By.CLASS_NAME, 'catalog-product__name.ui-link.ui-link_black').get_attribute('href')
        driver = uc.Chrome()
        driver.get(item_url)
        time.sleep(5)
        nam = driver.find_element(By.CLASS_NAME, 'product-card-top__title').text
        goods['name']=nam
        try:
            pric = driver.find_element(By.CLASS_NAME, 'product-buy__price').text
            goods['price']=pric
        except NoSuchElementException:
            pric = driver.find_element(By.CLASS_NAME, 'product-buy__price.product-buy__price_active').text
            goods['price']=pric
        img = driver.find_element(By.CLASS_NAME, 'product-images-slider__main-img').get_attribute('src')
        goods['image']=img
        click= driver.find_element(By.CLASS_NAME, 'button-ui.button-ui_white.product-characteristics__expand').click()
        time.sleep(5)
        desc = driver.find_element(By.CLASS_NAME, 'product-characteristics-content').text
        goods['description']=desc
        goods_dict['SSD M.2 накопители'].append(goods)
        driver.close()
    goods_mass.append(goods_dict)
except Exception as ex:
    print(ex)
finally:
    driver.quit()