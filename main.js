function preload()
{
classifier = ml5.imageClassifier("DoodleNet");

}

function setup()
{
canvas = createCanvas(500, 500);
canvas.center();
canvas.mouseReleased(classifyCanvas);
synth = window.speechSynthesis;
}

function draw()
{
strokeWeight(10);
stroke("#000000");
if (mouseIsPressed)
{
    line(pmouseX, pmouseY, mouseX, mouseY);
}
}

function clearCanvas()
{
    background("white");
}

function classifyCanvas()
{
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) 
{
    if (error)
    {
        console.error(error);
    }
    console.log(results);
    document.getElementById("label").innerHTML = "Label: " + results[0].label;

    document.getElementById("confidence").innerHTML = "Confidence: " + Math.round(results[0].confidence * 100) + "%";

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}