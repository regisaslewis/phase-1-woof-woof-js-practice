document.addEventListener("DOMContentLoaded", () => {
    let dogBar = document.getElementById("dog-bar");
    let dogInfo = document.getElementById("dog-info");
    let filterBtn = document.getElementById("good-dog-filter");

    fetch(`http://localhost:3000/pups`)
        .then((resp) => resp.json())
        .then((data) => {
            data.forEach((e) => {
                let span = document.createElement("span");
                span.textContent = e.name;
                dogBar.appendChild(span);
                filterBtn.addEventListener("click", () => {
                    if (filterBtn.textContent === "Filter good dogs: OFF") {
                        fetch(`http://localhost:3000/pups`)
                            .then((resp) => resp.json())
                            .then((obj) => {
                                obj.forEach(() => {
                                    if (e.isGoodDog === false) {
                                        span.style.visibility = "hidden";
                                    } else {
                                        span.style.visibility = "visible";
                                    }
                                    filterBtn.textContent = "Filter good dogs: ON";
                                })
                            })
                    } else if (filterBtn.textContent === "Filter good dogs: ON") {
                        fetch(`http://localhost:3000/pups`)
                            .then((resp) => resp.json())
                            .then((obj) => {
                                obj.forEach(() => {
                                    span.style.visibility = "visible";
                                })
                                filterBtn.textContent = "Filter good dogs: OFF";
                            })
                    }
                })
                function goodCheck() {
                    if (e.isGoodDog) {
                        return "Good Dog!"
                    } else {
                        return "Bad Dog!"
                    };
                }
                span.addEventListener("click", () => {
                    let dogSummary = document.createElement("div");
                    dogSummary.innerHTML = `<img src=${e.image}>
                    <h2>${e.name}</h2>
                    <button id="good-bad-btn">${goodCheck()}</button>`
                    if (dogInfo.innerHTML === '\n        \n      ') {
                        dogInfo.appendChild(dogSummary);
                    } else {
                        dogInfo.innerHTML = '\n        \n      ';
                        dogInfo.appendChild(dogSummary);
                    }
                    let goodBadButton = document.getElementById("good-bad-btn");
                    goodBadButton.addEventListener("click", () => {
                        const buttonSwapObj = {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json"
                            },
                            body: JSON.stringify({
                                isGoodDog: e.isGoodDog = !e.isGoodDog
                            })
                        }
                        fetch(`http://localhost:3000/pups/${e.id}`, buttonSwapObj)
                            .then((resp) => resp.json)
                            .then((data) => goodBadButton.textContent = goodCheck(data))
                    })
                })
            })
        })
})