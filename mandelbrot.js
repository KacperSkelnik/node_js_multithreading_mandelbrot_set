const {complex, multiply, add, abs} = require('mathjs')


exports.isConvergent = function(re, im, maxNumIterations){
    let z_0 = complex(0, 0)
    let C = complex(parseFloat(re), parseFloat(im))
    let z_1;
    for(var i = 0; i < maxNumIterations; i++){
        z_1 = add(multiply(z_0, z_0),C);
        if(abs(z_1) >= 2) return i;
        z_0 = z_1;
    }
    return maxNumIterations+1;
}

exports.linspace = function(start, stop, num) {
    const step = (stop - start) / num;
    return Array.from({length: num}, (_, i) => start + step * i);
}