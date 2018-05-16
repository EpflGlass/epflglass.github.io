
var data;


var raw_html =  '<div class="4u{2}"><span class="image fit">' +
                '<div class="container">' +
                '<img src="{0}" style="width:100%;">' +
                '<div class="text-block">{1}</div>' +
                '</div>' +
                '</span></div>';

$.getJSON("data/glass_sim.json", function(json) {
    // console.log(json); // this will show the info it in firebug console
    data = json;
    create_menu(data['names'])
});


function display_preview() {
    var e = document.getElementById("demo-glass-names");
    var id_select = e.options[e.selectedIndex].value;
    var filename = 'data/' + data['names'][id_select] + '_preview.jpg';
    console.log(filename);
    document.getElementById('img_src').src = filename
}

function create_menu(names) {

    var select = document.getElementById("demo-glass-names");

    for (var i = 0; i < names.length; i++) {
        var option = document.createElement("option");
        option.text = names[i];
        option.value = i;
        select.appendChild(option);
    }

    display_preview()
}

function display_results() {

    var e = document.getElementById("demo-glass-names");
    var id_select = e.options[e.selectedIndex].value;
    var text = '';
    for (var i = 0; i < data['args'][id_select].length; i++) {
        var n = '';
        if ((i+1)%3===0) {
            n = '$'
        }
        text = text + raw_html
            .replace('{2}', n)
            .replace('{0}', 'data/' + data['names'][data['args'][id_select][i]] + '_preview.jpg')
            .replace('{1}', data['names'][data['args'][id_select][i]]
                + '<br>' + 'score: ' + data['values'][id_select][i].toFixed(5))
    }

    document.getElementById("display-result").innerHTML = text;
    document.getElementById("section-results").style.visibility = 'visible';

}