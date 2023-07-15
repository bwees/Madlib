var wbCell = `
    <div id="word-1">
        <label for="ta-1"><code>My name is @</code></label>
        <textarea name="textarea" class="form-control" style="width: 300px; height: 500px; margin-inline: 4px;" id="ta1" placeholder="Enter 1 word per line"></textarea>
    </div>
`

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

document.getElementById("createWB").onclick = function(t) {
    // diable template input
    document.getElementById("template").disabled = true;
    // hide create button
    document.getElementById("createWB").style.display = "none";

    // remove hidden from div
    document.getElementById("wb").removeAttribute("hidden");
    document.getElementById("gen").removeAttribute("hidden");

    // split template text by @
    var template = document.getElementById("template").value.split("@");

    // remove last element
    template.pop();

    template.forEach(function(element, i) {
        var wbCellCopy = wbCell;
        wbCellCopy = wbCellCopy.replace("word-1", "word-" + (i + 1));
        wbCellCopy = wbCellCopy.replace("ta-1", "ta-" + (i + 1));
        wbCellCopy = wbCellCopy.replace('id="ta1"', 'id="ta-' + (i + 1)+'"');
        wbCellCopy = wbCellCopy.replace("<code>My name is @</code>", "<code>" + element + "@</code>");

        document.getElementById("wb-scroll").innerHTML += wbCellCopy;
    });
}

document.getElementById("genButton").onclick = function(t) {
    // collect all words from each bank into array
    var words = [];
    var template = document.getElementById("template").value.split("@");
    template.pop();

    template.forEach(function(element, i) {
        var tWords = [];
        var ta = document.getElementById("ta-" + (i + 1)).value.split("\n");
        ta.forEach(function(word) {
            tWords.push(element + word);
        });
        shuffle(tWords);
        words.push(tWords);
    });

    console.log(words);

    var count = document.getElementById("numGen").value;

    for (var i = 0; i < count; i++) {
        var string = "";
        words.forEach(function(element) {
            string += element[Math.floor(Math.random() * element.length)];
        });

        var template = document.getElementById("template").value.split("@");
        string += template[template.length - 1];

        // add string to ta-gen textarea
        document.getElementById("ta-gen").value += string + "\n";

    }
}