var val = document.getElementById("valR").value;
document.getElementById("img-video").src = "/static/images/satisfaction/man1/" + val + ".png";
function showVal(newVal){
    document.getElementById("img-video").src = "/static/images/satisfaction/man1/"+newVal+ ".png";
}
