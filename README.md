# Wspaniały, wielowątkowy generator zbioru Mandelbrota w Node.js - Kacper Skelnik

## Testy
Aby włączyć testy należy zainstalować zależności z pliku package.json
```bash
npm install mathjs canvas yargs
```
Trzeba także pamiętać, że Node.js musi być w wersji powyżej v10.5.0. aby wielowątkowość zadziałała. Następnie należy uruchomić plik runTests.py
```bash
python runTests.py
```
Domyślnie testy są ustawione tak:
```python
sizes = [32, 64, 128, 256, 512, 1024, 2048, 4096, 8192] # wielkości obrazka
chunkSize = 20 # wielkość kawałka liczonego przez jeden wątek na raz
workersNumber = 4 # liczba wątków 

numRuns = 10 # liczba powtórzeń wywołania programu dla danych parametrów
```
można to oczywiście zmienić wedle uznania. Gdy program skończy, zapisze rezultaty w pliku __nodejs_results.csv__. Zapisze również wygenerowane obrazki.

## Program
Aby uruchomić pojedyncze wywołanie programu wpisz:
```bash
node ./index.js --experimental-worker -s 1024, -c 25, -w 2
```
gdzie:
- -s - wielkość obrazka
- -c - wielokośc kawałka liczonego przez jeden wątek na raz
- -w - liczba wątków 

Działa też help
```bash
node ./index.js -h
```