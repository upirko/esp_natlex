var mq = require('MQ135').connect(A0);
console.log(mq.getPPM());
//console.log(mq.getCorrectedPPM(temperature, humidity));