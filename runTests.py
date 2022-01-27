import subprocess

sizes = [32, 64, 128, 256, 512, 1024, 2048, 4096, 8192]
chunkSize = 20
workersNumber = 4

numRuns = 10

results = {}
for size in sizes:
    time = 0
    for _ in range(numRuns):
        p = subprocess.Popen(['node', './index.js', '--experimental-worker', '-s', f'{size}', '-c', f'{chunkSize}', '-w', f'{workersNumber}'], stdout=subprocess.PIPE)
        out = p.stdout.read()
        
        time += float(out.decode())/numRuns
    results[f'{size}'] = time


with open('nodejs_results.csv', 'w') as f:
    f.write("%s,%s\n"%('size', 'time'))
    for key in results.keys():
        f.write("%s,%s\n"%(key, results[key]))