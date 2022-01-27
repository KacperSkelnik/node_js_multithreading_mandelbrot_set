const { linspace } = require('./mandelbrot');
const { createCanvas } = require("canvas");
const { Worker } = require('worker_threads');
const fs = require('fs');
const yargs = require('yargs');


const argv = yargs
.option('size', {
  alias: 's',
  description: 'Size of image',
  type: 'number'
})
.option('chunkSize', {
  alias: 'c',
  description: 'Size of chunk to split image for computing purpose',
  type: 'number'
})
.option('workersNumber', {
  alias: 'w',
  description: 'Numbers of separate workers (threads) to perform computing',
  type: 'number'
})
.help().alias('help', 'h').argv;


const size = argv.size;
const chunkSize = argv.chunkSize;
let linesDone = 0;

let width = linspace(-2.1, 0.6, size);
let high = linspace(-1.2, 1.2, size);

const workers = new Set();
let workersNumber = argv.workersNumber;
const maxNumIterations = 200;


const canvas = createCanvas(size, size);
const context = canvas.getContext("2d");


const runTask = (worker) => {
  if(linesDone < size){
    worker.postMessage({
      num: maxNumIterations,
      chunkSize: linesDone+chunkSize < size ? chunkSize : size-linesDone,
      line: linesDone,
      size: size,
      points: {
        x: width,
        y: linesDone+chunkSize < size ? high.slice(linesDone, linesDone+chunkSize) : high.slice(linesDone),
      }
    });
    linesDone += chunkSize;
  }
  else {
    worker.terminate();
    workers.delete(worker);
    if(workers.size == 0){
      const out = fs.createWriteStream(__dirname + `/mandelbrot_${size}.png`);
      const stream = canvas.createPNGStream();
      stream.pipe(out);

      const end = Date.now();
      console.log((end - start) / 1000);
    }
  }
}


const run = () =>{
  for(let i = 0; i < workersNumber; i++){
    let worker = new Worker('./mandelbrotWorker.js');
    workers.add(worker);
  
    worker.on('message', (data) => {
      const img = context.getImageData(0, 0, size, chunkSize);
      img.data.set(data.imgData);
      context.putImageData(img, 0, data.line);
  
      runTask(worker);
    });
    runTask(worker);
  }
}


const start = Date.now();
run()