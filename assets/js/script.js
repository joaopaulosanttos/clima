document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== '') {
        clearResults();
        showWarning('Buscando localização ...');


        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=3b81900d3c6c31241848e4dc084a2abd&units=metric&lang=pt_br`;

        let results = await fetch(url); 
        let json = await results.json();

        if(json.cod === 200) {
            showResults({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp, 
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg

            })
        } else {
            clearResults()
            showWarning('Não encontramos essa localização'); 
        }
    } else {
        clearResults();
    }
});

function showResults(json) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`; 
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    // modificando o icon do tempo 
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`); 

    // modificando o transform do css
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`; 

    // mostrando o css 
    document.querySelector('.resultado').style.display = 'block';
}

function clearResults() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}
