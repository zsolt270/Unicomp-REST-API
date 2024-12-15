# Unicomp felvételi feladat - Balogh Zsolt
Ez a repo tartalmazza a megoldásomat, a Unicomp felvételi feladathoz.

## Követelményeknek
- node & npm
- git

## Futtatás
1. Clone repo:
```
git clone git@github.com:zsolt270/Unicomp-REST-API.git
```
2. Packagek feltelepítése:
```
npm i
```
3. Mongodb cluster készítése
4. Private JWT key készítése:
```
//Például CLI-on belül
require('crypto').randomBytes(64).toString('hex')
```
5. .env file készítése az alábbiakkal:
```
PORT = <port number>
DB_CONNECTION_STRING = mongodb+srv://dev:<db_password>@<db_name>.qpdrdfz.mongodb.net/?retryWrites=true&w=majority&appName=<db_name>
PRIVATE_JWT_KEY = <private jwt key>
```
6. Szerver elindítása:
```
npm run start
```
7. A swagger dokumentáció eléréséhez:
```
http://localhost:<PORT>/api-docs
```
