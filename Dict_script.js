const input = document.getElementById("userInput");
const btn = document.getElementById("btn");
const icon = document.getElementById("icon");
const div = document.getElementById("myDiv")
const ic = document.getElementById("ic");
let audio;
let c = 0;

btn.addEventListener('click', function () {
    getMeaning();
});


const getMeaning = () => {
    c = 0;

    document.getElementById("myDIV").innerHTML = null;
    try {
        if (input.value.toString().trim() == "") {
            throw "There was an error fetching the word data";
        } else {
            fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + input.value.toString(), {
                "method": "GET"
            })
                .then(response => response.json())
                .then(data => {

                    let defArray = data[0].meanings[0].definitions;
                    audio = new Audio(data[0].phonetics[0].audio);
                    var word = input.value.toString();
                    var text = document.createElement("H1");
                    var phonetics = (data[0].phonetics[0].text);
                    var phon = document.createElement("H3");
                    var x = document.createElement("HR");
                    var p = document.createElement('DIV');

                    text.innerHTML = word;
                    document.getElementById("myDIV").appendChild(text);
                    phon.innerHTML = phonetics;
                    p.appendChild(phon);
                    p.appendChild(ic);
                    p.classList.add("proDiv");
                    document.getElementById("myDIV").appendChild(p);

                    document.getElementById("myDIV").appendChild(x);
                    document.getElementById("myDIV").style.visibility = "visible";
                    ic.style.visibility = "visible";
                    defArray.forEach(printDef)
                    icon.addEventListener('click', function () {
                        audio.play();
                    });


                })
        }
    } catch (err) {

        var para = document.createElement("P");
        para.innerHTML = err;
        document.getElementById("myDIV").appendChild(para);
    }
}
const printDef = defArray => {
    c = c + 1;
    var para = document.createElement("P");
    para.innerHTML = "<b>Definition " + c + ":</b> " + defArray.definition + "<br> " + "<b>Example: </b>" + defArray.example;
    document.getElementById("myDIV").appendChild(para);

    var x = document.createElement("HR");
    document.getElementById("myDIV").appendChild(x);
}
