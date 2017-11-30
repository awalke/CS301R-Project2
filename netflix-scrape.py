import requests
import bs4

response = requests.get('https://www.finder.com/netflix-tv-shows')
soup = bs4.BeautifulSoup(response.text, "html.parser")
tv_titles = soup.select('tbody > tr > td > div > b')

response = requests.get('https://www.finder.com/netflix-movies')
soup = bs4.BeautifulSoup(response.text, "html.parser")
movie_titles = soup.select('tbody > tr > td > b')

thefile = open('netflix-titles.txt', 'w')

# print tv_titles[14].text

for title in tv_titles:
    thefile.write("%s\n" % title.text.encode('utf8'))

for title in movie_titles:
    thefile.write("%s\n" % title.text.encode('utf8'))
