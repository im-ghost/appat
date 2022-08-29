import requests

url = '/fakedata'
headers = {'Accept' : 'application/json', 'Content-Type' : 'application/json'}
r = requests.post(url, data=open('example.json', 'rb'), headers=headers)
