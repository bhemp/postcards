$(document).ready(function () {

    $('#generate').click(function () {
        var locationValue = $('#location').val();
        var introValue = $('#intro').val();

        $('#locationText').html(locationValue);
        $('#introText').html(introValue);
    });


});

function updateLHPS(val) {
    document.getElementById('locHPText').innerHTML = val;
    document.getElementById('locationText').style.left = val + '%';
}

function updateLVPS(val) {
    document.getElementById('locVPText').innerHTML = val;
    document.getElementById('locationText').style.top = val + '%';
}

function updateLFSS(val) {
    document.getElementById('locFSText').innerHTML = val;
    document.getElementById('locationText').style.fontSize = val + 'px';
}

function previewFile() {
    // Where you will display your image
    var preview = document.querySelector('bgImg');
    // The button where the user chooses the local image to display
    var file = document.querySelector('input[type=file]').files[0];
    // FileReader instance
    var reader = new FileReader();

    // When the image is loaded we will set it as source of
    // our img tag
    reader.onloadend = function () {
        preview.src = reader.result;
    }


    if (file) {
        // Load image as a base64 encoded URI
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}


//window.onload = addListeners;
//
//function addListeners() {
//    document.getElementById('locationText').addEventListener('mousedown', mouseDown, false);
//    window.addEventListener('mouseup', mouseUp, false);
//
//}
//
//function mouseUp() {
//    window.removeEventListener('mousemove', divMove, true);
//}
//
//function mouseDown(e) {
//    window.addEventListener('mousemove', divMove, true);
//}
//
//function divMove(e) {
//    var div = document.getElementById('locationText');
//    div.style.top = e.clientY + 'px';
//    div.style.left = e.clientX + 'px';
//}

//
//$('#locVPSlider').onchange(function () {
//    var locVPValue = $('#locVPSlider').val();
//    $('#locVPText').html(locHPValue);
//});


//<!--https://stackoverflow.com/questions/11855781/jquery-getting-data-from-form-->
