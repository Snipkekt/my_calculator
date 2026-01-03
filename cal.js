
const inputBox = document.querySelector(".val");
const resultBox = document.querySelector(".result");
const buttons = document.querySelectorAll(".btn button");
buttons.forEach(button => {
    button.addEventListener("click", function () {
        const val = this.innerText;
        if (val === "C") {
            inputBox.value = "";
            resultBox.value = "0";
        } else if (val === "=") {
            try {
                const res = eval(inputBox.value);
                if (res === Infinity || res === -Infinity || isNaN(res)) {
                    resultBox.value = "Error";
                    return;
                }
                resultBox.value = res;
            }
            catch (e) {
                resultBox.value = "Error";
            }

        }

        else {
            inputBox.value += val;
        }
    });
});
