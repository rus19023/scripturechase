const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .map(score => {
    return `<tr class="high-score"><td class="high-score left">${score.name}</td><td>&nbsp; &nbsp; </td><td class="high-score right">${score.score}</td></tr>`;
  })
  .join("");
