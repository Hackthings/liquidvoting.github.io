
jQuery(document).ready(function($) {

  // jQuery('.dropdown').dropdown();

  $.fn.api.settings.api = {
    'quickregn': 'http://localhost:3000/quickregn'
  };

  $('#stepone').fadeIn().removeClass('steps');
  // $('#steptwo').fadeIn().removeClass('steps');
  // $('#stepthree').fadeIn().removeClass('steps');
  // $('#stepfour').fadeIn().removeClass('steps');


  $('#register')
  .form({
    fields: {
      aadhaarno: {
        identifier: 'aadhaarno',
        rules: [{
          type   : 'empty',
          prompt : 'Please enter Aadhaar number'
        },
        {
          type: 'regExp[/^[0-9]{12}$/]',
          prompt: 'Please check the format'
        }]
      },
      dobuser: {
        identifier : 'dobuser',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your Date of Birth'
          },
          {
            type: 'regExp[^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$]',
            prompt: 'Please check the format'
          }
        ]
      }
    }
  })
  .api({
    method: 'POST',
    action: 'quickregn',
    // datatype: 'json',
    // serializeForm: true,
    response: function (response) {
      console.log(response);
      console.log('reply');
      $('#stepone').fadeOut();
      $('#steptwo').fadeIn();
    },
    onSuccess: function (e, t) {
      console.log(e);
      console.log(t);
    }
  });

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

});