var web3 = new Web3();
var global_keystore;

var eth_node_url = 'http://128.199.116.249:8545';
web3.setProvider(new web3.providers.HttpProvider(eth_node_url));
var connected = false;

if(!web3.isConnected()) {
  $('.ui.basic.modal')
  .modal({
    blurring: true
  })
  .modal('show')
;
}


function setWeb3Provider(keystore) {
  var web3Provider = new HookedWeb3Provider({
    host: "http://128.199.116.249:8545",
    transaction_signer: keystore
  });
  web3.setProvider(web3Provider);
}


jQuery(document).ready(function($) {

  var api = {
    'quickregn': 'http://128.199.116.249:8888/register',
    'quicklogin' : 'http://localhost:3000/quicklogin'
  };


  $( '#register' ).submit(function( event ) {

    event.preventDefault();
    $(this).find(".submit-button").prop('disabled',true).html("Registering......");

    var aadhar_id = document.getElementById('aadhar_id').value;
    var randomSeed = lightwallet.keystore.generateRandomSeed(aadhar_id);
    var password = document.getElementById('password').value;

    localStorage.setItem("aadhar_id", aadhar_id);
    localStorage.setItem("password", password);


    lightwallet.keystore.deriveKeyFromPassword(password, function(err, pwDerivedKey) {
        global_keystore = new lightwallet.keystore(
          randomSeed,
          pwDerivedKey);

        newAddresses(password);
        setWeb3Provider(global_keystore);
        window.location = "vote-list.html";
    });

  });


  //Ajax Call

  // $.ajax({
  //   method: "POST",
  //   url: api.quickregn,
  //   datatype : "json",
  //   crossDomain: true,
  //   data: {aadhar_id : aadhar_id,address : address},
  //   contentType: "application/json",
  //   beforeSend: function(request) {
  //    // request.setRequestHeader("Content-Type", "application/json; charset=utf8");
  //    // request.setRequestHeader("Accept", "application/json");
  // $(this).find(".submit-button").prop('disabled',true).html("Registering......");
  //   },
  //   success: function(resultData) {
  //     window.location = "vote-index.html";
  //     console.log( "Data Saved: " + msg );
  //   },
  //   error: function (jqXHR, textStatus, errorThrown){
  //     console.log(  textStatus );
  //   }
  // });

  //setWeb3Provider(global_keystore);
  //getBalances();


  function sendNewEth(to, amt) {
    var fromAddr = '0xa6f157148aaf440a2b98c8e1f31d45784b375294'
    var toAddr = to
    var valueEth = amt
    var value = parseFloat(valueEth)*1.0e18
    var gasPrice = 50000000000
    var gas = 50000
    web3.eth.sendTransaction({from: fromAddr, to: toAddr, value: amt}, function (err, txhash) {
      console.log('error: ' + err)
      console.log('txhash: ' + txhash)
    })
  }

  function newAddresses(password) {
    lightwallet.keystore.deriveKeyFromPassword(password, function(err, pwDerivedKey) {
      global_keystore.generateNewAddress(pwDerivedKey, 1);
      var addresses = global_keystore.getAddresses();
    });
  }


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

function functionCall() {
  var fromAddr = localStorage.getItem("address");
  var aadhar_id = localStorage.getItem("aadhar_id");

  var contractAddr = '0xf19dfa28e201ca4cb61f7fd01e0177b5b6adb465';
  var abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"name","type":"bytes32"},{"name":"voteCount","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"proposal_index","type":"uint256"}],"name":"addVote","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"wallet_address","type":"address"},{"name":"aadhar_id","type":"bytes32"}],"name":"addVoter","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voters","outputs":[{"name":"voted","type":"bool"},{"name":"vote","type":"uint256"},{"name":"aadhar_id","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"curator","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"proposal_index","type":"uint256"}],"name":"show_count","outputs":[{"name":"count","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"proposalNames","type":"bytes32[]"}],"type":"constructor"}]');

  var contract = web3.eth.contract(abi).at(contractAddr)
  var functionName = "addVoter";
  var args = JSON.parse('[{wallet_address: '+ fromAddr +', aadhar_id:'+ aadhar_id +'}]');
  var valueEth = 1;
  var value = parseFloat(valueEth)*1.0e18
  var gasPrice = 50000000000
  var gas = 3141592
  args.push({from: fromAddr, value: value, gasPrice: gasPrice, gas: gas})
  var callback = function(err, txhash) {
    console.log('error: ' + err)
    console.log('txhash: ' + txhash)
  }
  args.push(callback)
  contract[functionName].apply(this, args)
}
