function GerarQRCode(){

    var inputUsuario = document.querySelector('textarea').value;

    var googleChartAPI = 'https://chart.googleapis.com/chart?cht=qr&chs=500x500&chld=H&chl=';

    var conteudoQRCode = googleChartAPI + encodeURIComponent(inputUsuario);
    document.querySelector('#QRCodeImage').src = conteudoQRCode;


}
