// Marvel public key 625244fe9d1e1221ee8b08911b5230ca
let offset = 20;
//Mok de dados para filtros
let series = [
{name:'Agents of S.H.I.E.L.D', id:'20607, 20566'}, {name:'Falcon', id:'23603'},
{name:'Ant-Man', id:'19275'}, {name:'Fantastic Four', id:'2123'},
{name:'Avengers', id:'24229'}, {name:'Fearless Defenders', id:'17370'},
{name:'Avengers vs. X-Mem', id:'18904'}, {name:'Gambit', id:'777'},
{name:'Black Bolt', id:'23121'}, {name:'Guardians of the Galaxy', id:'20465'},
{name:'Black Panther', id:'3627'}, {name:'Infinity Gauntlet', id:'2023'},
{name:'Bishop', id:'3626'}, {name:'Jessica Jones', id:'22645'},
{name:'Captain America', id:'24503'}, {name:'Runaways', id:'19416'},
{name:'Daredevil', id:'14434'}, {name:'Star Wars', id:'20110'},
{name:'Deadpool', id:'20613'}, {name:'The Amazing Spider-Man', id:'20432'},
{name:'Elektra', id:'22561'}, {name:'Thor: God of Thunder', id:'16729'},
{name:'Extraordinary X-Men20460'}, {name:'X-Men', id:'403'}
]
 
let selSeries = [];

let characters =[
 {name:'Wolverine', id: '1009718'}, {name:'Cyclops', id: '1009257'},
 {name:'Spider-Man', id: '1009610'}, {name:'Iron Man', id: '1009368'},
 {name:'Storm', id: '1009629'}, {name:'Hulk', id: '1009351'},
 {name:'Thing', id: '1009662'}, {name:'Captain America', id: '1009220'},
 {name:'Daredevil', id: '1009718'}, {name:'Thor', id: '1009718'},
 {name:'Punisher', id: '1009515'}, {name:'Falcon', id: '1009297'},
 {name:'Deadpool', id: '1009268'}, {name:'Bishop', id: '1009182'},
 {name:'Thanos', id: '1009652'}, {name:'Hawkeye', id: '1009338'},
 {name:'Toxin', id: '1009676'}, {name:'Apocalypse', id: '1009156'},
 {name:'Bastion', id: '1009171'}, {name:'Star Brand', id: '1011307'},
 {name:'Quake', id: '1009313'}, {name:'Drax', id: '1010735'},
 {name:'Triton', id: '1010335'}, {name:'Turbo', id: '1011047'},
];
let selChar =[];

let creators = [
{name:'Stan lee',id:'30'},{name:'Jason Aaron', id:'11463'},
{name:'Saladin Ahmed',id:''}, {name:'Donny Cates', id:''},
{name:'Al Ewing',id:'Saladin Ahmed'},{name:'Tini Howard', id:'13536'},
{name:'Nick Spencer',id:'11434'},{name:'Kelly Thompson', id:'1427'},
{name:'Dan Jackson',id:'12513'}, {name:'Paco Roca', id:''},
{name:'Ron Validar',id:'2897'}, {name:'Charles Ves', id:'2042'},
{name:'Pat Quinn',id:'602'},{name:'MacKenzie Cadenhead', id:'4421'},
{name:'Chris Robinson',id:'12719'},{name:'Lan Medina', id:'437'},
{name:'Bob Mackie',id:'2269'},{name:'Vince Fago', id:'1445'},
{name:'Paula Foye',id:'3711'},{name:'Douglas Franchin', id:'13209'},
{name:'Alex Nino3124'},{name:'Cliff Nielsen', id:'7739'},
{name:'Yates',id:'2669'},{name:'David Yardin', id:'789'}
];
let selCre =[];


let fullList = [];
let results;
let url = 'https://gateway.marvel.com/v1/public/comics?ts=1';

//Função Principal

$(function () {
    generateFilters()
    
    $.getJSON(url, {
        apikey: '625244fe9d1e1221ee8b08911b5230ca',
        hash: 'ef26ff08c9bce0c61ae321f330b011d7',
        orderBy: 'modified',
        limit: 12,
    })
        .done(function (response) {
            results = response.data.results;
            let resultsLen = results.length;
            doList();        
        });

});

//Funções para busca e filtros

function setLists(type,id) {

    switch (type) {

        case 'series' :
            if (selSeries.includes(id)) {
                selSeries =selSeries.filter(function(value,index,arr) { return value != id});
            }
            else {
                selSeries.push(id)
            }

        break;

        case 'chars' :
            if (selChar.includes(id)) {
                selChar =selChar.filter(function(value,index,arr) { return value != id});
            }
            else {
                selChar.push(id)
            }
        break;

        case 'cre' :
            if (selCre.includes(id)) {
                selCre =selCre.filter(function(value,index,arr) { return value != id});
            }
            else {
                selCre.push(id)
            }

            break

    }

    
}

async function generateFilters() {
    let out_series = '';
    let out_char ='';
    let out_cre='';
    await series.map(
        (item , index) => {
            out_series += '<label class="filtros" ">'+item.name+'<input id="s'+(index +1)+'" value="'+item.name+'" check="false"  onchange="setLists(\'series\','+item.id+')" type="checkbox"> <span class="checkmark"></span></label>'
        }
    )
    await characters.map(
        (item , index) => {
            out_char += '<label class="filtros" ">'+item.name+'<input id="c'+(index +1)+'" value="'+item.name+'" check="false"  onchange="setLists(\'chars\','+item.id+')" type="checkbox"> <span class="checkmark"></span></label>'
        }
    )
    await creators.map(
        (item , index) => {
            out_cre += '<label class="filtros" ">'+item.name+'<input id="cr'+(index +1)+'" value="'+item.name+'" check="false"  onchange="setLists(\'cre\','+item.id+')" type="checkbox"> <span class="checkmark"></span></label>'
        }
    )
    $('#series').append(out_series);
    $('#characters').append(out_char);
    $('#creators').append(out_cre);
}

function doList() {
    let output = '';
    let creator = '';
    results.map(
        item => {
            if (item.images.length > 0) {
                creators = item.creators.items.length > 1 ?
                    item.creators.items[0].name.substring(0, item.title.indexOf(" ")) + ', ' +
                    item.creators.items[1].name.substring(0, item.title.indexOf(" ")) :
                    item.creators.items.length === 0 ? 'wait data....' :
                    item.creators.items[0].name.substring(0, item.title.indexOf(" "));
                 output += '<div class="comic"> <img src="' +
                    item.images[0].path + '/portrait_xlarge.' +
                    item.images[0].extension + '"><br> <span class="comic-title">' +
                    item.title.substring(0, item.title.indexOf("#") === -1 ?
                        item.title.length :
                        (item.title.indexOf("#")) + 3) + '</span> <br> <span class="comic-authors">' + creators + '</span></div>';
            }
            else { 
                
                    creators = item.creators.items.length > 1 ?
                        item.creators.items[0].name.substring(0, item.title.indexOf(" ")) + ', ' +
                        item.creators.items[1].name.substring(0, item.title.indexOf(" ")) :
                        item.creators.items.length === 0 ? 'wait data....' :
                        item.creators.items[0].name.substring(0, item.title.indexOf(" "));
                     output += '<div class="comic"> <img src="./assets/images/noimage.jpg"><br> <span class="comic-title">' +
                        item.title.substring(0, item.title.indexOf("#") === -1 ?
                            item.title.length :
                            (item.title.indexOf("#")) + 3) + '</span> <br> <span class="comic-authors">' + creators + '</span></div>';
                
            }

        }

    )

    $('#results').append(output);

}

function loadMore() { 
    let options = {
        apikey: '625244fe9d1e1221ee8b08911b5230ca',
        hash: 'ef26ff08c9bce0c61ae321f330b011d7',
        orderBy: 'modified',
        limit: 12,
        characters: selChar.toString(),
        series: selSeries.toString(),
        creators: selCre.toString(),
        offset: offset
    }
  if (selChar.length == 0) delete options.characters;
  if (selSeries.length == 0) delete options.series;
  if (selCre.length == 0) delete options.creators;

    $.getJSON(url, options)
        .done(function (response) {
            results = response.data.results;
            let resultsLen = results.length;
            offset = offset +20;
            window.scrollTo(0, 850);
            $('#results').html('');
            doList();          
        });

}

//controle do slider

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("showSlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}