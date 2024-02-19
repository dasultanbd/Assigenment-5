let planSeat = document.getElementById("plan-seat");
let discountPlan = document.getElementById("discount-seat");
let seatInputNum = document.getElementById('seat-input-num')
let couponInput = document.getElementById("discount-input-num");


let count = 0;
let amountHere = 0;
planSeat.addEventListener("click", (event) => {
    let targetBox = event.target;


    if (
        event.target.nodeName === "P" &&
        event.target.innerText.length === 2 &&
        event.target.classList[8] !== "ticket"
    ) {
        console.log(event)
        event.target.classList.add("ticket");
        if (count >= 3) {
            discountPlan.classList.remove("btn-disabled");
        }


        if (count === 4) {
            alert("Book maximum 4 seat");
        } else {
            targetBox.style.backgroundColor = "#1DD100";
            targetBox.style.color = "white";
            count = count + 1;
            let seatInnerText = event.target.innerText;
            seatAddValueById("class-seat");
            seatRemoveValueById("class-seat-left");
            setElementById("ul-container", seatInnerText);
            setValueById("total-price", amountHere);
            setValueById("grand-total-price", amountHere);
        }
        seatInputNum.addEventListener('keyup', (event) => {
            if (count > 0 && event.target.value.length > 0) {
                document.getElementById('next-button').classList.remove("btn-disabled")
            }
        })


    }
});

function seatAddValueById(elementId) {
    let element = document.getElementById(elementId);
    let sellectedTotalSeatConvertToNumber = parseInt(
        document.getElementById("class-seat").innerText
    );
    element.innerText = sellectedTotalSeatConvertToNumber + 1;
}
function seatRemoveValueById(elementId) {
    let element = document.getElementById(elementId);
    let seatLeftConvertToNumber = parseInt(
        document.getElementById("class-seat-left").innerText
    );
    element.innerText = seatLeftConvertToNumber - 1;
    amountHere = amountHere + 550;
}

function setValueById(elementId, value) {
    let element = document.getElementById(elementId);
    element.innerText = value;
}

function setElementById(a, b) {
    let ticket = document.getElementById(a);

    let li = document.createElement("li");
    li.classList.add("flex", "justify-between");
    li.innerHTML = `<p>${b}</p>
    <p>Economoy</p>
    <p>550</p> `;
    ticket.appendChild(li);
}



discountPlan.addEventListener("click", function () {
    if (count === 1 && seatInputNum.value.length === 1) {
        document.getElementById('next-btn').classList.remove('btn-disabled')
    }

    console.log(seatInputNum.value.length)
    if (couponInput.value === "NEW15") {
        let discount = discountFifteen("grand-total-price");
        setDiscountElementById("coupon-container", discount);
        document.getElementById("discount-seat").classList.add("hidden");
        document.getElementById("discount-input-num").classList.add("hidden");
    } else if (couponInput.value === "Couple 20") {
        let discount = discountTwenty("grand-total-price");
        setDiscountElementById("coupon-container", discount);
        document.getElementById("discount-seat").classList.add("hidden");
        document.getElementById("discount-input-num").classList.add("hidden");
    } else {
        couponInput.value = "";
        alert("Please provide a valid coupon code");
    }
});

function abcd() { }

function discountFifteen(elementId) {
    let element = document.getElementById(elementId);

    let convertToNumber = parseInt(element.innerText);
    let discount = (convertToNumber * 15) / 100;

    let newGrandTotal = convertToNumber - discount;
    element.innerText = newGrandTotal;
    return discount;
}

function discountTwenty(elementId) {
    let element = document.getElementById(elementId);

    let convertToNumber = parseInt(element.innerText);
    let discount = (convertToNumber * 20) / 100;

    let newGrandTotal = convertToNumber - discount;
    element.innerText = newGrandTotal;
    return discount;
}

function setDiscountElementById(a, price) {
    let ticket = document.getElementById(a);

    let li = document.createElement("li");
    li.classList.add("flex", "justify-between", "text-[#000]", "font-medium");
    li.innerHTML = `<p>Discount Price </p><p>BDT ${price}</p>`;
    ticket.appendChild(li);
}


seatInputNum.addEventListener('focus', (event) => {
    if (count > 0) {
        document.getElementById('next-button').classList.remove("btn-disabled")
    }
    document.getElementById('next-button').addEventListener('click', () => {
        event.target.value = ""
        document.getElementById('next-button').classList.add('btn-disabled')
    })
})

