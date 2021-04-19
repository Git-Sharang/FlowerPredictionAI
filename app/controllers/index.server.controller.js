const tf = require("@tensorflow/tfjs");
const iris = require("../../iris.json");
const irisTesting = require("../../iris-testing.json");
var lossValue;

exports.trainAndPredict = function (req, res) {
  console.log(req.body);
  const irisUserTesting = [
    {
      sepal_length: parseFloat(req.body.sepalLength),
      sepal_width: parseFloat(req.body.sepalWidth),
      petal_length: parseFloat(req.body.petalLength),
      petal_width: parseFloat(req.body.petalWidth),
    },
    {
      sepal_length: 0,
      sepal_width: 0,
      petal_length: 0,
      petal_width: 0,
    },
  ];
  console.log(irisUserTesting);

  const trainingData = tf.tensor2d(
    iris.map((item) => [
      item.sepal_length,
      item.sepal_width,
      item.petal_length,
      item.petal_width,
    ])
  );

  //tensor of output for training data
  //the values for species will be:
  // setosa:       1,0,0
  // virginica:    0,1,0
  // versicolor:   0,0,1
  const outputData = tf.tensor2d(
    iris.map((item) => [
      item.species === "setosa" ? 1 : 0,
      item.species === "virginica" ? 1 : 0,
      item.species === "versicolor" ? 1 : 0,
    ])
  );

  //tensor of features for testing data
  const testingData = tf.tensor2d(
    irisUserTesting.map((item) => [
      item.sepal_length,
      item.sepal_width,
      item.petal_length,
      item.petal_width,
    ])
  );

  // build neural network using a sequential model
  const model = tf.sequential();
  //add the first layer
  model.add(
    tf.layers.dense({
      inputShape: [4], // four input neurons
      activation: "sigmoid",
      units: 5, //dimension of output space (first hidden layer)
    })
  );
  //add the hidden layer
  model.add(
    tf.layers.dense({
      inputShape: [5], //dimension of hidden layer
      activation: "sigmoid",
      units: 3, //dimension of final output (setosa, virginica, versicolor)
    })
  );
  //add output layer
  model.add(
    tf.layers.dense({
      activation: "sigmoid",
      units: 3, //dimension of final output (setosa, virginica, versicolor)
    })
  );
  
  model.compile({
    loss: "meanSquaredError",
    optimizer: tf.train.adam(parseFloat(req.body.learningRate)),
  });
  console.log(model.summary());

  async function run() {
    const startTime = Date.now();
    await model.fit(trainingData, outputData, {
      epochs: parseFloat(req.body.epochs),
      callbacks: {
        onEpochEnd: async (epoch, log) => {
          lossValue = log.loss;
          console.log(`Epoch ${epoch}: lossValue = ${log.loss}`);
          elapsedTime = Date.now() - startTime;
          console.log("elapsed time: " + elapsedTime);
        },
      },
    });
    const results = model.predict(testingData);
    results.array().then((array) => {
      console.log(array[0][0]);
      console.log(array[0]);
      var result = compareOutcomes(array[0][0], array[0][1], array[0][2]);
      console.log(result);
      res.status(200).send(result);
    });
  }
  run();
};

compareOutcomes = function(firstNumber, secondNumber, thirdNumber) {
  let setosa = Math.round((firstNumber + Number.EPSILON) * 100) / 100;
  let verginica = Math.round((secondNumber + Number.EPSILON) * 100) / 100;
  let versicolor = Math.round((thirdNumber + Number.EPSILON) * 100) / 100;
  var result;
  if(setosa > verginica && setosa > versicolor){
    result = {flower: "Setosa", predictedValue: setosa};
    return result;
  }else if(verginica > setosa && verginica > versicolor){
    result = {flower: "Verginica", predictedValue: verginica};
    return result;
  }else{
    result = {flower: "Versicolor", predictedValue: versicolor};
    return result;
  }
};