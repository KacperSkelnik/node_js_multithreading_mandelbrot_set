const { isConvergent } = require('./mandelbrot');
const { parentPort } = require('worker_threads');


const plotMandelbrot = (x, y, size, chunkSize, numIter) => {    
    const imgData = new Uint8ClampedArray(size * chunkSize * 4);
    setColor = (y, x, n, maxNumIterations) => {
        const i = 255*n/maxNumIterations
        var r = Math.round(Math.sin(0.04 * i + 0) * 127 + 128);
        var g = Math.round(Math.sin(0.04 * i + 2) * 127 + 128);
        var b = Math.round(Math.sin(0.04 * i + 4) * 127 + 128);

        const index = 4 * (size * x + y);
        imgData[index] = r;
		imgData[index + 1] = g;
		imgData[index + 2] = b;
		imgData[index + 3] = 255;
    }

    for(let xIter = 0; xIter < size; xIter++){
        for(let yIter = 0; yIter < chunkSize; yIter++){
            setColor(xIter, yIter, isConvergent(x[xIter], y[yIter], numIter), numIter);   
        }
    }
    return imgData;
}

parentPort.on('message', (data) => {
    const imgData = plotMandelbrot(data.points.x, data.points.y, data.size, data.chunkSize, data.num);
    // Sends results to the main thread
    parentPort.postMessage({
        imgData,
        line: data.line
    });
});