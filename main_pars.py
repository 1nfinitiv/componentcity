import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

import time

mark=[]
mark_cars = []

# url = 'https://auto.ru/?utm_referrer=www.google.com'
# driver = webdriver.Chrome()
# driver.get(url)
# time.sleep(5)
# driver.find_element(By.CLASS_NAME, 'IndexMarks__show-all').click()



try:
    a=1
    url = 'https://auto.ru/?utm_referrer=www.google.com'
    driver = webdriver.Chrome()
    driver.get(url)
    time.sleep(5)
    column=driver.find_elements(By.CLASS_NAME, 'IndexMarks__col')
    for i in column:
        
        column_element=i.find_elements(By.CLASS_NAME,'IndexMarks__item')
        for k in column_element:
            mark_element= k.find_element(By.CLASS_NAME,'IndexMarks__item-name').text
            mark.append(mark_element)
            url= k.get_attribute('href')
            max_page=2
            page=1
            mark_name = {'car': [] }
            while page<=max_page:
                if page == 1:
                    url_auto = url
                    driver = webdriver.Chrome()
                    driver.get(url_auto)
                    time.sleep(10)
                    all_cars=driver.find_elements(By.CLASS_NAME, 'ListingItem.ListingItem_ctbautoru128Exp')

                    for i in all_cars:
                        cars={'car_id':a, 'name':'','description':'', 'price':'','image':''}
                        nam= i.find_element(By.CLASS_NAME, 'Link.ListingItemTitle__link').text
                        cars['name']=nam
                        desc=i.find_element(By.CLASS_NAME, 'ListingItemTechSummaryDesktop.ListingItem__techSummary').text.replace('\u2009', ' ')
                        cars['description']=desc
                        try:
                            pr = i.find_element(By.CLASS_NAME, 'ListingItemPriceNew__content-HAVf2').text
                            cars['price']=pr
                        except NoSuchElementException:
                            try:
                                pr = i.find_element(By.CLASS_NAME,'Link.ListingItemPrice__link').text
                                cars['price']=pr
                            except NoSuchElementException:
                                pr=''
                                cars['price']=pr
                        try:
                            img = i.find_element(By.CLASS_NAME,'LazyImage__image').get_attribute('src')
                            cars['image']=img
                        except NoSuchElementException:
                            try:
                                img = i.find_element(By.CLASS_NAME,'OfferPanorama__previewLayer.OfferPanorama__previewLayer_1').get_attribute('src')
                                cars['image']=img
                            except NoSuchElementException:
                                img = ''
                                cars['image']=img
                        mark_name[mark_element].append(cars)
                else:
                    try:
                        url_auto = url + '?page='+str(page)
                        driver = webdriver.Chrome()
                        driver.get(url_auto)
                        time.sleep(10)
                        all_cars=driver.find_elements(By.CLASS_NAME, 'ListingItem.ListingItem_ctbautoru128Exp')
                        for i in all_cars:
                            cars={'car_id':a, 'name':'','description':'', 'price':'','image':''}
                            nam= i.find_element(By.CLASS_NAME, 'Link.ListingItemTitle__link').text
                            cars['name']=nam
                            desc=i.find_element(By.CLASS_NAME, 'ListingItemTechSummaryDesktop.ListingItem__techSummary').text.replace('\u2009', ' ')
                            cars['description']=desc
                            try:
                                pr = i.find_element(By.CLASS_NAME, 'ListingItemPriceNew__content-HAVf2').text
                                cars['price']=pr
                            except NoSuchElementException:
                                try:
                                    pr = i.find_element(By.CLASS_NAME,'Link.ListingItemPrice__link').text
                                    cars['price']=pr
                                except NoSuchElementException:
                                    pr=''
                                    cars['price']=pr
                            try:
                                img = i.find_element(By.CLASS_NAME,'LazyImage__image').get_attribute('src')
                                cars['image']=img
                            except NoSuchElementException:
                                try:
                                    img = i.find_element(By.CLASS_NAME,'OfferPanorama__previewLayer.OfferPanorama__previewLayer_1').get_attribute('src')
                                    cars['image']=img
                                except NoSuchElementException:
                                    img = ''
                                    cars['image']=img
                            mark_name[mark_element].append(cars)
                        a+=1
                    except:
                        continue
                page+=1
            mark_cars.append(mark_name)
            print(mark_name)
            print(len(mark_name[mark_element]))
    # for m in mark:
    #     for i in mark_cars:
    #         if m in i:
    #             s = i[m]
    #             for v in s:
    #                 print (v)
    #                 if  m in i:
    #                     v['car_id']=a
    #                     a += 1
    print(mark)
    print(mark_cars)

except Exception as ex:
    print(ex)
finally:
    driver.close()
    driver.quit()
