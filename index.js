function obavijesti_me() {
  alert("Pozdrav iz zemlje Safari!!!");
}

function napravi_nasumican_broj() {
  // pravi nasumican broj od 0-1
  const nasumicanBroj = Math.random();
  // kanali za boje se krecu od 0 do 255
  const skaliranBroj = 255 * nasumicanBroj;
  // zaokruzi broj na manji (otkini decimale)
  const zaokruzenBroj = Math.floor(skaliranBroj);

  return zaokruzenBroj;
}

function napravi_nasumicnu_boju() {
  const crvena = napravi_nasumican_broj();
  const zelena = napravi_nasumican_broj();
  const plava = napravi_nasumican_broj();
  // rbg je funcija koja pravi boju sa kanalima
  // r - red, g - green, b - blue
  return `rgb(${crvena},${zelena},${plava})`;
}

function ucitana_stranica() {
  // zaobli element #drugi-div
  document.getElementById("drugi-div").style.borderRadius = "50px";

  // kada kliknemo na element #btn2
  document.getElementById("btn2").onclick = function () {
    // promjeni pozadinsku boju elementa #btn2 na neku nasumicnu boju
    const novaBoja = napravi_nasumicnu_boju();

    // console.log funkcija ispisuje bilo koju vrijednost na konzolu
    console.log(novaBoja);
    document.getElementById("btn2").style.backgroundColor = novaBoja;
  };
  igrica();
  random_sudar();
}

function brisi() {
  const element = document.getElementById("btn5");

  // element se brise iz HTML, ne mozemo ga vratiti
  // element.remove();

  // element onstane u HTML ali ne zauzima prostor
  element.style.display = "none";

  // element nije prikazan, ali zauzima prostor (ostane rupa)
  // element.style.visibility = "hidden";
}

function pisi() {
  const element = document.getElementById("btn5");

  element.style.display = "inline-block";
  // element.style.visibility = "visible";
}



function dodaj_krug() {
  // nadji canvas element
  const canvas = document.getElementById("mojKanvas");
  // uzmi kontekst za crtanje 2D
  const ctx = canvas.getContext("2d");

  // nasumicna pozicija od 0 do sirine canvas-a 200px
  const x = Math.round(Math.random() * canvas.width);
  // nasumicna pozicija od 0 do visine canvas-a 100px
  const y = Math.round(Math.random() * canvas.height);
  // nasumicni poluprecnik kruga do 50px
  const radius = Math.round(Math.random() * 50);
  nacrtaj_krug(ctx, x, y, radius);
}

function nacrtaj_krug(ctx, x, y, radius) {
  // zapocni crtanje
  ctx.beginPath();
  // opisi krug
  // x, y, radius, startAngle, endAngle
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  // iscrtaj jednom linijom
  ctx.stroke();
}

let interval = 0;
function pokreni_simulaciju() {
  // nadji canvas element
  const canvas = document.getElementById("mojKanvas");
  // uzmi kontekst za crtanje 2D
  const ctx = canvas.getContext("2d");

  // fps - frames per second
  // broj osvjezavanja u sekundi
  // sve preko 24 oko nece primjetiti da ponovo iscrtavamo
  // probajte sa 10 ili sa 30
  const fps = 15;
  // brzina kretanja kruga (pixel/second)
  const brzina = 50;
  // moramo podijeliti brzinu sa fps da bismo dobili promjenu pozicije u pixel/frame-u
  const promjenaPoOsvjezenju = brzina / fps;

  // pocetne pozicije x, y
  let x = 0; // koristimo "let" jer cemo da mijenjamo ovu vrijednost
  let y = 0;
  const radius = 10; // koristimo "const" jer radius necemo da mijenjamo

  // obrisi bilo koju postojecu simulaciju
  zaustavi_simulaciju();

  function iscrtaj_na_novoj_poziciji() {
    // naivan nacin, promjenimoi x i y za istu vrijednost da bismo se kretali po dijagonali
    x += promjenaPoOsvjezenju;
    y += promjenaPoOsvjezenju;
    // obrisi canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nacrtaj_krug(ctx, x, y, radius);
  }
  // nacrtaj krug na pocetnoj poziciji
  nacrtaj_krug(ctx, x, y, radius);
  // interval stavimo u varijablu "interval" da bismo ga mogli obrisati
  // setInterval prima milisekunde, a "fps" je u sekundama, zato dijelimo 1000.0 sa fps
  interval = setInterval(iscrtaj_na_novoj_poziciji, 1000.0 / fps);
}

function zaustavi_simulaciju() {
  // "interval" je broj, ako je veci od 0 znaci da postoji i da ga mozemo izbrisati
  if (interval > 0) {
    clearInterval(interval);
  }
}

function iscrtaj_e() {
  // nadji canvas element
  const canvas = document.getElementById("kanvasGrafikon");
  // uzmi kontekst za crtanje 2D
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const sirina_stuba = 30; // px
  const razmak_stubova = 70; // px
  const pocetna_pozicija = 20;

  // koliko puta godisnje uzimamo kamatu,
  // a kamata nam je 1/broj, npr brooj = 2 znaci da je kamata 1/2 = 0.5 = 50%
  const broj_perioda = [1, 2, 3, 4, 12, 365, 10000];
  for (var i = 0; i < broj_perioda.length; i++) {
    const x_vrijednost = broj_perioda[i];
    // svaki korak nam se poveca glavnica za kamatu a to radimo x_vrijednost puta godisnje
    // Math.pow funkcija je stepen
    const y_vrijednost = Math.pow(1 + 1 / x_vrijednost, x_vrijednost);

    // vrijednosti su od 2-2.718281..., tako da mnozimo sa 100 da bismo imali vrijednosti od 200-271
    const visina_stubica = y_vrijednost * 100; // px

    // pocevsi od pocetnog pomjerimo se za svaki sledeci
    const x_pozicija = pocetna_pozicija + i * razmak_stubova;
    // posto Y koordinata ide na dole, moramo poceti iznad dna
    const y_pozicija = canvas.height - visina_stubica;

    // zapocni crtanje
    ctx.beginPath();
    ctx.fillStyle = napravi_nasumicnu_boju(); // oboji nasumicno
    ctx.fillRect(x_pozicija, y_pozicija, sirina_stuba, visina_stubica);

    ctx.strokeText(
      `${x_vrijednost} - ${y_vrijednost.toFixed(4)}`,
      x_pozicija - sirina_stuba / 2, // malo pomjerimo u lijevo od stubica
      y_pozicija - 10 // malo iznad stubica
    );
  }
}
function dodaj_krug1() {
  // nadji canvas element
  const canvas = document.getElementById("sudar_krug");
  // uzmi kontekst za crtanje 2D
  const ctx = canvas.getContext("2d");

  // nasumicna pozicija od 0 do sirine canvas-a 200px
  const x = Math.round(Math.random() * canvas.width);
  // nasumicna pozicija od 0 do visine canvas-a 100px
  const y = Math.round(Math.random() * canvas.height);
  // nasumicni poluprecnik kruga do 50px
  const radius = Math.round(Math.random() * 50);
  nacrtaj_krug1(ctx, x, y, radius);
}
function nacrtaj_krug1(ctx, x, y, radius) {
  // zapocni crtanje
  ctx.beginPath();
  // opisi krug
  // x, y, radius, startAngle, endAngle
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  // iscrtaj jednom linijom
  ctx.stroke();
}
let interval1 = 0;
function pokreni_simulaciju1() {
  // nadji canvas element
  const canvas = document.getElementById("sudar_krug");
  // uzmi kontekst za crtanje 2D
  const ctx = canvas.getContext("2d");

  // fps - frames per second
  // broj osvjezavanja u sekundi
  // sve preko 24 oko nece primjetiti da ponovo iscrtavamo
  // probajte sa 10 ili sa 30
  const fps = 30;
  // brzina kretanja kruga (pixel/second)
  const brzina = 100;
  // moramo podijeliti brzinu sa fps da bismo dobili promjenu pozicije u pixel/frame-u
  let promjenaPoOsvjezenju = brzina / fps;

  // pocetne pozicije x, y
  let x = 30; // koristimo "let" jer cemo da mijenjamo ovu vrijednost
  let y = 70;
  const radius = 30; // koristimo "const" jer radius necemo da mijenjamo

  // obrisi bilo koju postojecu simulaciju
  zaustavi_simulaciju1();

  function iscrtaj_na_novoj_poziciji1() {
    // naivan nacin, promjenimoi x i y za istu vrijednost da bismo se kretali po dijagonali
    x += promjenaPoOsvjezenju;

    if (x + radius > canvas.width || x - radius < 0) {
      promjenaPoOsvjezenju = -promjenaPoOsvjezenju;
    }

    // obrisi canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nacrtaj_krug1(ctx, x, y, radius);
  }
  // nacrtaj krug na pocetnoj poziciji
  nacrtaj_krug1(ctx, x, y, radius);
  // interval stavimo u varijablu "interval" da bismo ga mogli obrisati
  // setInterval prima milisekunde, a "fps" je u sekundama, zato dijelimo 1000.0 sa fps
  interval1 = setInterval(iscrtaj_na_novoj_poziciji1, 1000.0 / fps);
}
function zaustavi_simulaciju1() {
  // "interval" je broj, ako je veci od 0 znaci da postoji i da ga mozemo izbrisati
  if (interval1 > 0) {
    clearInterval(interval1);
  }
}
function igrica() {
  var canvas = document.getElementById('c');
  var ctx = canvas.getContext("2d");

  var tile_size = 10;
  var startX = canvas.width / 2;
  var startY = canvas.height / 2;

  // current x, y
  var cx = startX,
    cy = startY;

  ctx.fillRect(startX, startY, tile_size, tile_size);

  document.addEventListener("keydown", function (e) {

    switch (e.keyCode) {
      //left
      case 65:
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(cx - tile_size, cy, tile_size, tile_size);
        cx -= tile_size;
        break;

      //up
      case 87:
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(cx, cy - tile_size, tile_size, tile_size);
        cy -= tile_size;
        break;

      //right
      case 68:
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(cx + tile_size, cy, tile_size, tile_size);
        cx += tile_size;
        break;

      //down
      case 83:
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(cx, cy + tile_size, tile_size, tile_size);
        cy += tile_size;
        break;
    }

    document.getElementById("coords").innerText = ("cx: " + cx + ", cy: " + cy);
  }, false);
}


function random_sudar() {
  var brojac = 5;
  document.getElementById("rezultat").innerText = brojac;
  var canvas = document.getElementById("c");
  var ctx = canvas.getContext("2d");
  var ballRadius = 10;
  var x = canvas.width / 2;
  var y = canvas.height - 30;
  var dx = 2;
  var dy = -2;
  var paddleHeight = 10;
  var paddleWidth = 75;
  var paddleX = (canvas.width - paddleWidth) / 2;
  var rightPressed = false;
  var leftPressed = false;

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.getElementById("desno").addEventListener("click", pomjerajDesno, false);
  document.getElementById("lijevo").addEventListener("click", pomjerajLijevo, false);
  
  function pomjerajDesno() {
    paddleX += 30;
  }
  function pomjerajLijevo() {
    paddleX -= 30;
  }


  function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
    }
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy < ballRadius) {
      dy = -dy;
    }
    else if (y + dy + paddleHeight > canvas.height - ballRadius &&
      x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
      brojac -= 1;
      document.getElementById("rezultat").innerText = brojac;
      x = canvas.width / 2;
      y = canvas.height - 30;
      dx = 2;
      dy = -2;
      if (brojac === 0) {
        alert("Game over")
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
      }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    x += dx;
    y += dy;
  }
  
  var interval = setInterval(draw, 10);
}

