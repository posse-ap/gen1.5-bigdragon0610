"use strict";

const broccoli_btn = document.getElementById("broccoli_btn");

broccoli_btn.addEventListener("click", () => {
  document.getElementById("broccoli").innerText = "...計算中";
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    fetch(
      `https://cyberjapandata2.gsi.go.jp/general/dem/scripts/getelevation.php\?lon\=${lon}\&lat\=${lat}`
    )
      .then((response) => response.json())
      .then(
        (data) =>
          (document.getElementById("broccoli").innerText = Math.floor(
            data.elevation / 0.08
          ))
      );
  });
});
