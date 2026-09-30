const showBtn = document.getElementById("showBtn");
const resetBtn = document.getElementById("resetBtn");
const powerInput = document.getElementById("power");


powerInput.addEventListener("input", function () {
  document.getElementById("powerOut").textContent = powerInput.value;
});

function val(id) {
  return document.getElementById(id).value.trim();
}

function showInfo() {
  const errorBox = document.getElementById("error");
  const name = val("fullName");
  const email = val("email");

  if (!name) {
    errorBox.textContent = "Enter your full name to build the card.";
    document.getElementById("fullName").focus();
    return;
  }
  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    errorBox.textContent =
      "That email address looks incomplete. Use a format like name@site.com.";
    document.getElementById("email").focus();
    return;
  }
  errorBox.textContent = "";

  const hobbyEl = document.querySelector('input[name="hobby"]:checked');

  const data = [
    ["Full name", name],
    ["Nickname", val("nickname")],
    ["Email", email],
    ["Phone", val("phone")],
    ["Age", val("age")],
    ["Birthday", val("birthday")],
    ["Hometown", val("hometown")],
    ["Website", val("website")],
    ["Favorite color", document.getElementById("color").value],
    ["Favorite food", val("food")],
    ["Main hobby", hobbyEl ? hobbyEl.value : ""],
    ["Confidence", powerInput.value + " / 10"],
    ["Motto", val("bio")],
    [
      "Updates",
      document.getElementById("updates").checked
        ? "Yes, sign me up"
        : "No thanks",
    ],
  ];

  const list = document.getElementById("summaryList");
  list.replaceChildren();
  data.forEach(function (row) {
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = row[0];
    if (row[1]) {
      dd.textContent = row[1];
      if (row[0] === "Favorite color") {
        dd.style.borderLeft = "14px solid " + row[1];
        dd.style.paddingLeft = ".5rem";
      }
    } else {
      dd.textContent = "Not provided";
      dd.className = "empty";
    }
    list.append(dt, dd);
  });
  list.hidden = false;
  document.getElementById("placeholder").hidden = true;

  const card = document.getElementById("card");
  const color = document.getElementById("color").value;
  card.style.setProperty("--c", color); // style change
  document.getElementById("cardName").textContent = data[1][1]
    ? name + ' "' + data[1][1] + '"'
    : name;
  document.getElementById("cardPower").textContent = "Lv " + powerInput.value;
  const portrait = document.getElementById("portrait");
  portrait.textContent = name
    .split(/\s+/)
    .map(function (w) {
      return w[0];
    })
    .slice(0, 2)
    .join("")
    .toUpperCase();
  portrait.setAttribute("aria-label", "Initials of " + name); // attribute change
  const bits = [hobbyEl ? hobbyEl.value : "", val("hometown")].filter(Boolean);
  document.getElementById("cardTag").textContent = bits.length
    ? bits.join(" from ")
    : "A mystery collector";
  document.getElementById("cardBio").textContent = val("bio")
    ? '"' + val("bio") + '"'
    : "";

  const stats = document.getElementById("cardStats");
  stats.replaceChildren();
  [
    ["Age", val("age")],
    ["Food", val("food")],
    ["Email", email],
    ["Site", val("website")],
  ].forEach(function (s) {
    if (!s[1]) return;
    const dt = document.createElement("dt");
    dt.textContent = s[0];
    const dd = document.createElement("dd");
    dd.className = "stat";
    if (s[0] === "Site" && /^https?:\/\//i.test(s[1])) {
      const a = document.createElement("a");
      a.setAttribute("href", s[1]);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
      a.textContent = s[1].replace(/^https?:\/\//i, "");
      dd.appendChild(a);
    } else {
      dd.textContent = s[1];
    }
    stats.append(dt, dd);
  });

  const shownStats = document.getElementsByClassName("stat").length;
  const inputsOnPage =
    document.getElementsByTagName("input").length +
    document.getElementsByTagName("select").length +
    document.getElementsByTagName("textarea").length;
  const filled =
    Array.from(document.querySelectorAll(".info")).filter(function (el) {
      return el.type === "checkbox" ? el.checked : el.value.trim() !== "";
    }).length + (hobbyEl ? 1 : 0);
  document.getElementById("note").textContent =
    "Read " +
    data.length +
    " fields (" +
    inputsOnPage +
    " form controls on the page, " +
    filled +
    " filled in, " +
    shownStats +
    " stats on the card).";

  card.classList.remove("flash");
  void card.offsetWidth;
  card.classList.add("flash");
  setTimeout(function () {
    card.classList.remove("flash");
  }, 1000);
}

function resetAll() {
  document.getElementById("infoForm").reset();
  document.getElementById("powerOut").textContent = powerInput.value;
  document.getElementById("error").textContent = "";
  document.getElementById("card").style.removeProperty("--c");
  document.getElementById("cardName").textContent = "Your name here";
  document.getElementById("cardPower").textContent = "Lv 5";
  document.getElementById("portrait").textContent = "?";
  document.getElementById("cardTag").textContent =
    "Hobby and hometown appear here";
  document.getElementById("cardBio").textContent = "";
  document.getElementById("cardStats").replaceChildren();
  document.getElementById("summaryList").hidden = true;
  document.getElementById("placeholder").hidden = false;
  document.getElementById("note").textContent = "";
}

showBtn.addEventListener("click", showInfo);
resetBtn.addEventListener("click", resetAll);
