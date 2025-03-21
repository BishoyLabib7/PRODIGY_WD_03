(function (r, t) {
  ("use strict");
  r.onerror = function (e, r, t) {
    return false;
  };
  r.AudioContext = r.AudioContext || r.webkitAudioContext;
  var s = (function (e) {
    try {
      var r = "_";
      e.setItem(r, r);
      e.removeItem(r);
      return true;
    } catch (e) {
      return false;
    }
  })(r.localStorage);

  function y(e) {
    if (f || !c[e]) {
      return;
    }
    if (l && l.resume) {
      l.resume();
    }
    var r = l.createBufferSource();
    r.buffer = c[e];
    r.connect(l.destination);
    if (r.start) {
      r.start(0);
    } else {
      r.noteOn(0);
    }
  }
  console.log(gameMode);

  var a = {},
    n = { player1: 0, player2: 0, ties: 0 },
    i = { player1: 0, player2: 0, ties: 0 },
    u = "x",
    m = "o",
    c = {},
    l,
    v = 9,
    f,
    d,
    L = true,
    p = true,
    q = false,
    h = 300,
    S = 0.75,
    w,
    g = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  function b() {
    for (var e = a.mute.length; e--; ) {
      a.mute[e].style.display = f ? "none" : "";
    }
  }
  function T() {
    f = !f;
    if (s) {
      localStorage.setItem("muted", f.toString());
    }
    b();
  }

  function M() {
    q = !q;

    var e = a.scores.scores.classList;
    if (q) {
      e.remove("p1");
      e.add("p2");
      p = true;
    } else {
      e.remove("p2");
      e.add("p1");
      p = false;
    }
    a.scores.player1.innerHTML = q ? i.player1 : n.player1;
    a.scores.player2.innerHTML = q ? i.player2 : n.player2;
    a.scores.ties.innerHTML = q ? i.ties : n.ties;
    d = false;
    I();
  }
  function k(e, r) {
    a.squares[r].querySelector("div").classList.add(e);
  }
  function A() {
    var e = a.scores.turn1.classList,
      r = a.scores.turn2.classList,
      t = a.scores.turnTies.classList;
    if (q && a.restart.style.display === "none") {
      if (L) {
        r.remove("turn");
        e.add("turn");
      } else {
        e.remove("turn");
        r.add("turn");
      }
      t.add("turn");
    } else {
      e.remove("turn");
      r.remove("turn");
      t.remove("turn");
    }
  }
  function D(e) {
    if (w[e] !== 0 || x() || (!q && L)) {
      return;
    }
    if (q) {
      L = !L;
      w[e] = L ? -1 : 1;
      k(L ? u : m, e);
      y("note-" + (L ? "low" : "high"));
      x();
    } else {
      w[e] = -1;
      k(u, e);
      L = true;
      y("note-low");
      setTimeout(C, h);
    }
    A();
  }
  function H(s, o) {
    a.restart.style.display = "block";
    setTimeout(
      function () {
        var e = "Game",
          r = q ? "players " : "computer ";
        setTimeout(function () {
          d = false;
        }, h);
        if (o) {
          for (var t = 3; t--; ) {
            a.squares[o[t]].classList.add("win");
          }
        }
        switch (s) {
          case u:
            a.scores.player1.innerHTML = q ? ++i.player1 : ++n.player1;
            a.scores.player1.classList.add("appear");
            a.board.classList.add("win");
            y("game-over");
            break;
          case m:
            a.scores.player2.innerHTML = q ? ++i.player2 : ++n.player2;
            a.scores.player2.classList.add("appear");
            a.board.classList.add("win");
            y("game-over");
            break;
          default:
            a.scores.ties.innerHTML = q ? ++i.ties : ++n.ties;
            a.scores.ties.classList.add("appear");
            a.board.classList.add("tie");
            y("game-over-tie");
            break;
        }
      },
      L && !q ? 100 : h + 100
    );
  }
  function x() {
    for (var e = g.length; e--; ) {
      var r = g[e],
        t = w[r[0]] + w[r[1]] + w[r[2]];
      if (t === 3 || t === -3) {
        H(t === 3 ? m : u, r);
        return true;
      }
    }
    var s = 0;
    for (e = v; e--; ) {
      if (w[e] !== 0) {
        s++;
      }
    }
    if (s === 9) {
      H();
      return true;
    }
    return false;
  }
  function C() {
    if (x()) {
      return;
    }
    var e,
      r,
      t,
      s,
      o,
      a,
      n = 0;
    L = false;
    A();
    y("note-high");
    for (e = v; e--; ) {
      if (w[e] !== 0) {
        n++;
        if (n === 1) {
          a = e;
        }
      }
    }
    if (n < 2 && Math.random() > 0.2) {
      do {
        o = Math.floor(Math.random() * v);
      } while (o === a);
    } else {
      for (e = v; e--; ) {
        for (r = v; r--; ) {
          if (w[r] !== 0) {
            continue;
          }
          w[r] = 1;
          if (x()) {
            k(m, r);
            return;
          }
          w[r] = 0;
        }
        if (w[e] !== 0) {
          continue;
        }
        w[e] = 1;
        var i = null,
          u = w.concat();
        for (r = v; r--; ) {
          if (u[r] !== 0) {
            continue;
          }
          u[r] = -1;
          for (t = g.length; t--; ) {
            if (
              u[g[t][0]] + u[g[t][1]] + u[g[t][2]] === -3 &&
              Math.random() > S
            ) {
              w[e] = 0;
              w[r] = 1;
              k(m, r);
              x();
              return;
            }
          }
          var c = 0,
            l = 0,
            f = u.concat(),
            d = u.concat();
          for (t = v; t--; ) {
            if (f[t] === 0) {
              f[t] = 1;
            }
            if (d[t] === 0) {
              d[t] = -1;
            }
          }
          for (t = g.length; t--; ) {
            if (f[g[t][0]] + f[g[t][1]] + f[g[t][2]] === 3) {
              c++;
            }
            if (d[g[t][0]] + d[g[t][1]] + d[g[t][2]] === -3) {
              l++;
            }
          }
          var p = c - l;
          i = i == null ? p : i > p ? p : i;
          u[r] = 0;
        }
        if (s == null || s < i) {
          s = i;
          o = e;
        }
        w[e] = 0;
      }
    }
    w[o] = 1;
    k(m, o);
    x();
  }
  function B(r) {
    a.squares[r].ontouchstart = a.squares[r].onmousedown = function (e) {
      e.preventDefault();
      D(r);
    };
  }
  function I() {
    if (d) {
      return;
    }
    d = true;
    a.restart.style.display = "none";
    w = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var e = v; e--; ) {
      a.squares[e].classList.remove("win");
      a.squares[e].querySelector("div").className = "";
    }
    a.scores.ties.classList.remove("appear");
    a.scores.player1.classList.remove("appear");
    a.scores.player2.classList.remove("appear");
    a.board.classList.remove("win");
    a.board.classList.remove("tie");
    L = p = !p;
    A();
    if (p && !q) {
      setTimeout(C, h);
    }
  }
  t.addEventListener("DOMContentLoaded", function () {
    a = {
      board: t.querySelector(".board"),
      squares: t.querySelectorAll(".square"),
      restart: t.querySelector(".restart"),
      muteButton: t.querySelector(".mute"),
      mute: t.querySelectorAll(".mute path"),
      privacy: t.querySelector(".privacy"),
      scores: {
        scores: t.querySelector(".scores"),
        swap: t.querySelector(".swap"),
        player1: t.querySelector(".player1 .score"),
        player2: t.querySelector(".player2 .score"),
        ties: t.querySelector(".ties .score"),
        turn1: t.querySelector(".player1"),
        turn2: t.querySelector(".player2"),
        turnTies: t.querySelector(".ties"),
      },
    };
    for (var e = v; e--; ) {
      B(e);
    }
    a.restart.ontouchstart = a.scores.scores.ontouchstart = function (e) {
      e.preventDefault();
    };
    a.scores.scores.ontouchend = a.scores.scores.onclick = function (e) {
      e.preventDefault();
      M();
    };
    a.restart.ontouchend = a.restart.onclick = function (e) {
      e.preventDefault();
      I();
    };
    if (r.AudioContext) {
      l = new AudioContext();
      o("note-high");
      o("note-low");
      o("game-over");
      o("game-over-tie");
      f = s ? localStorage.getItem("muted") === "true" : false;
      b();
      a.muteButton.ontouchstart = a.muteButton.onclick = function (e) {
        e.preventDefault();
        T();
      };
    }
    I();
  });
})(window, document);
