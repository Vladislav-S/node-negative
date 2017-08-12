$(document).ready(function (){
  var nForm = $("#NForm");
  nForm.submit(function(e) {
    var fUrl = $('#urlArea').val();
    var fFile = $('#fileArea').val();
    e.preventDefault();

    if(fUrl === undefined || fFile === undefined) return;

    //console.log(fUrl);
    //console.log(fFile);

    if(fUrl === "" && fFile !== ""){
      var fd = new FormData();
      fd.append('img', $('#fileArea')[0].files[0]);
      send(fd);
    }
    else if (fUrl !== "" && fFile === "") {
      send({fUrl}, {_url:'/action/url'});
    }
    else {
      return;
    }

    /*$.ajax({
      type: 'POST',
      url: '/action',
      data: nForm.serialize(),
      success: function(data) {
        console.log("success");
      },
      error: function(data) {
        console.log("error");
      }
    });*/
  });

  $('#urlArea').click(function(){
    $("#fileArea").prop('disabled', true);
    $("#fileAreaBtn").addClass('disabled');
  }).change(function(){
    if($('#urlArea').val() === "") {
      $("#fileArea").prop('disabled', false);
      $("#fileAreaBtn").removeClass('disabled');
      setUrlFile("#preview");
    }
    else{
      setUrlFile("#preview", $('#urlArea').val());
    }
  });

  $('#fileArea').click(function(){
    $("#urlArea").prop('disabled', true);
  }).change(function(){
    if($('#fileArea').val() === ""){
      $('#urlArea').prop('disabled', false);
      setUrlFile('#preview');
    }
    else{
      readUrlFile(this);
    }

  });

});

function send(_data, obj ={_url: '/action', _processData: false, _contentType: false}){
  $.ajax({
    type: 'POST',
    url: obj._url,
    data: _data,
    processData: obj._processData,
    contentType: obj._contentType,
    success: function(data) {
      console.log("success");
      $("#output").attr("src", data);
    },
    error: function(data) {
      console.log(data);
    }
  });
}

function readUrlFile(input){
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
            $('#preview').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

function setUrlFile(id, url=''){
  $(id).attr('src', url);
}

//
//urlArea
//fileArea
/*
$('#urlArea').change(function(){
});
*/
