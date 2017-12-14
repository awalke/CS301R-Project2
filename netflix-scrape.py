# import requests
# import bs4
#
# response = requests.get('https://www.hulu.com/start/content')
# soup = bs4.BeautifulSoup(response.text, "html.parser")
# titles = soup.find_all("table > tbody > tr > td")
#
# print(titles)
#
# thefile = open('hulu-titles.txt', 'w')
#
# # print tv_titles[14].text
#
# for title in titles:
#     thefile.write("%s\n" % title.text.encode('utf8'))

from selenium import webdriver
from bs4 import BeautifulSoup
import time

driver = webdriver.Chrome()
driver.get("https://www.hulu.com/start/content")
time.sleep(3)
htmlSource = driver.page_source

count = 0

thefile = open('hulu-titles.txt', 'w')

while count < 141:
    soup = BeautifulSoup(htmlSource, "html.parser")
    ids = soup.select("img")

    start = False

    for i in ids:
        if i.get('alt', '').encode('utf8') == "Loading-animated-circle":
            start = False

        if start:
            thefile.write("%s\n" % i.get('alt', '').encode('utf8'))

        if i.get('alt', '').encode('utf8') == "Go to the next page":
            start = True


    button = driver.find_element_by_id('sosodssfs')
    button.click()

    time.sleep(3)

    htmlSource = driver.page_source
    count += 1
