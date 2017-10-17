// SIGNATURE PROGRESS
function moveProgressBar() {
  console.log("moveProgressBar");
  var getPercent = ($('.progress-wrap').data('progress-percent') / 100);
  var getProgressWrapWidth = $('.progress-wrap').width();
  var progressTotal = getPercent * getProgressWrapWidth;
  var animationLength = 2500;

  // on page load, animate percentage bar to data percentage length
  // .stop() used to prevent animation queueing
  $('.progress-bar').stop().animate({
    left: progressTotal
  }, animationLength);
};


function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}

/* sweetScroll load */
document.addEventListener("DOMContentLoaded", function () {
const sweetScroll = new SweetScroll({/* some options */});

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 30,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "polygon",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 19.18081918081918,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 4,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    },
    nb: 80
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});


// on page load..
moveProgressBar();

// on browser resize...
$(window).resize(function() {
  moveProgressBar();
});

}, false);


window.addEventListener('load', function() {

// web3 communication
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else { 
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.01:8545"));
}


// var coinbase = web3.eth.accounts[0];

// document.getElementById('test').innerHTML = coinbase;
/*
var contractABI = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"ex1","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getEx2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getEx3","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ex3","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"BuyTheLead","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getEx1","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ex2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"}]);

    var test = contractABI.at('0xd4a1314e3c39c7c67b877a2263606459543bcf18');
    var result1 = test.ex1(coinbase);
    var result2 = test.ex2();
    var result3 = test.ex3();

    console.log(web3.balance);
    console.log(result2);
    console.log(web3.toDecimal(result3));

    var balance = web3.eth.getBalance(coinbase);
    console.log(balance.toString(10)); // '1000000000000'
   */
  
  var balance;
  
  web3.fromWei(web3.eth.getBalance(web3.eth.coinbase, (err,bal) => {
    if(!err) {
      balance = web3.fromWei(bal,'ether').toString(10);
      console.log(balance);
      $('.progress-wrap').data("progress-percent", balance);
      moveProgressBar();
    }else{
      console.error(err);

    }  
  }));


  document.getElementById('fund').addEventListener("click", function() {
    var etherAmount = document.getElementById('etherAmount').value;
    // etherAmount     = parseInt(etherAmount)
    etherAmount     = web3.toWei(etherAmount, "ether")
    console.log(etherAmount);

    web3.eth.sendTransaction({from:coinbase, to:"0x5Be0E52bbe27e08F29467c712d7ff4cda8E75842", value: etherAmount}, (err, res) => {
      if(!err){
        console.log(res)
      }
      console.log(err)
    }); 

  });

   

});