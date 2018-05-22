
var data_connector;
var data_lens;
var data_outer;


var raw_html =  '<div class="4u{2}"><span class="image fit"><div>' +
                '<img src="{0}" style="width:100%;">' +
                '<div class="text-block">{1}</div>' +
                '</div></span></div>';

$.getJSON("data/json/outer.json", function(json) {
    data_outer = json;
    create_menu(data_outer['names'])
});

$.getJSON("data/json/lens.json", function(json) {
    data_lens = json;
});

$.getJSON("data/json/connector.json", function(json) {
    data_connector = json;
});


function display_preview() {
    var e = document.getElementById("demo-glass-names");
    var id_select = e.options[e.selectedIndex].value;
    var filename = 'data/outer/' + data_outer['names'][id_select] + '.jpg';
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

    // Set 3 rankings
    display_sub_ratio(data_lens, 'lens', id_select);
    display_sub_ratio(data_outer, 'outer', id_select);
    display_sub_ratio(data_connector, 'connector', id_select);

    document.getElementById("section-results").style.visibility = 'visible';

}

function display_sub_ratio(data, id_name, id_select) {

    var text = '';
    for (var i = 0; i < data['args'][id_select].length; i++) {
        var n = '';
        if ((i+1)%3===0) {
            n = '$'
        }
        text = text + raw_html
            .replace('{2}', n)
            .replace('{0}', 'data/' + id_name + '/' + data['names'][data['args'][id_select][i]] + '.jpg')
            .replace('{1}', data['names'][data['args'][id_select][i]]
                + '<br>' + 'score: ' + 100*data['values'][id_select][i].toFixed(3)+'%')
    }
    document.getElementById("display-result-" + id_name).innerHTML = text;

}
