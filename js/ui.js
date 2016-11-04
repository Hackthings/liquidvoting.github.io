
jQuery(document).ready(function($) {

  var api = {
    'quickregn': 'http://128.199.116.249:8888/register',
    'quicklogin' : 'http://localhost:3000/quicklogin'
  };


  $( '#register' ).submit(function( event ) { 
    
    $.ajax({
      method: "POST",
      url: api.quickregn,
      datatype : "json",
      crossDomain: true,
      data: JSON.stringify($( this ).serialize()),
      contentType: "application/json",
      beforeSend: function(request) {
       // request.setRequestHeader("Content-Type", "application/json; charset=utf8");
       // request.setRequestHeader("Accept", "application/json");

        $(this).find(".submit-button").prop('disabled', true).html("Registering......");
      },
      success: function(resultData) { 
        window.location = "vote-index.html";
        console.log( "Data Saved: " + msg );
      },
      error: function (jqXHR, textStatus, errorThrown){
        console.log(  textStatus );
      }
    });
   event.preventDefault();
  });


  // $('#register')
  // .form({
  //   fields: {
  //     aadhaarno: {
  //       identifier: 'aadhaarno',
  //       rules: [{
  //         type   : 'empty',
  //         prompt : 'Please enter Aadhaar number'
  //       },
  //       {
  //         type: 'regExp[/^[0-9]{12}$/]',
  //         prompt: 'Please check the format'
  //       }]
  //     },
  //     dopass: {
  //       identifier : 'dobuser',
  //       rules: [
  //         {
  //           type   : 'empty',
  //           prompt : 'Please enter a password'
  //         }
  //       ]
  //     }
  //   }
  // })
  // .api({
  //   method: 'POST',
  //   action: 'quickregn',
  //   datatype: 'json',
  //   //serializeForm: true,
  //   response: function (response) {
      
  //   },
  //   onSuccess: function (e, t) {
  //    $(this).find(".submit-button").prop('disabled', true).html("Registering......");
  //     // setTimeout(function(){
  //     //   window.location = "vote-index.html";
  //     // }, 3000);
  //   }
  // });

  $('#skiptovote').on('click', function() {
    window.document.title = 'Okay, let\'s move on';
    $('#stepone').fadeOut();
    $('#steptwo').fadeIn();
  });

  $('#downballet').on('click', function() {
    $('#steptwo').fadeOut('fast');

    $.get('http://localhost:3000/candidates', function(datas) {

      var html = '';
      jQuery.each(datas, function(index, item) {
        console.log(item);
        html += '<div class="item"> \
          <img class="ui avatar image" src="'+item.img+'"> \
          <div class="content"> \
            <a class="header">'+item.name+'</a> \
            <div class="description">'+item.descr+'</div> \
          </div> \
          <div class="right floated content"> \
            <div class="ui radio checkbox"> \
              <input type="radio" name="example2" checked="checked"> \
              <label></label> \
            </div> \
          </div> \
        </div>';

      });

      $('#candidates').html(html);

    });

    $('#stepthree').fadeIn('slow');
  });


  $('#uplBallet').on('click', function() {
    $('#stepthree').fadeOut();
    $('#stepfour').fadeIn();

    // $.get('http://localhost:3000/candidates', function(datas) {
    //   $('#stepfour').fadeIn();
    //
    // });

  });

  $("#divUpload").on("click", function() { 
     $('#hidden-new-file').click(); 
  });
  $("#login-divUpload").on("click", function() { 
     $('#login-hidden-new-file').click(); 
  });

  $('#hidden-new-file').on("change", function(e) {
    var fileName = e.target.files[0].name;
    $("#divUpload").html(fileName);
  });

  $('#login-hidden-new-file').on("change", function(e) {
    var fileName = e.target.files[0].name;
    $("#login-divUpload").html("Uploading please wait...");

    setTimeout(function(){
        window.location = "vote-list.html";
      }, 3000);

  });

});


function saveText(text, filename){
  var a = document.createElement('a');
  a.setAttribute('href', 'data:text/json;charset=utf-u,'+encodeURIComponent(JSON.stringify(text)));
  a.setAttribute('download', filename);
  a.click()
}