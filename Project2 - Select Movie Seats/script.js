const container = document.querySelector('.container');
const container2 = document.querySelector('.container2');
const container3 = document.querySelector('.container3');

const seats1 = container.querySelectorAll('.row .A-seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.querySelector('#total');

const seats2 = container2.querySelectorAll('.row2 .B-seat:not(.occupied)');
const count2 = document.querySelector('#count2');
const total2 = document.querySelector('#total2');

const seats3 = container3.querySelectorAll('.row3 .C-seat:not(.occupied)');
const count3 = document.querySelector('#count3');
const total3 = document.querySelector('#total3');

const movieSelect = document.querySelector('#movie');
const clearBtn = document.querySelector('.clear');
const clearBtn2 = document.querySelector('.clear2');
const clearBtn3 = document.querySelector('.clear3');

const grandTotal = document.querySelector('#count44');

const ticketPriceA = 8; // Joker
const ticketPriceB = 10; // Avengers
const ticketPriceC = 12; // Avatar

// Get data from localStorage and populate UI
const populateUI = (seats, storageKey) => {
    const selectedSeats = JSON.parse(localStorage.getItem(storageKey)) || [];

    if (selectedSeats.length > 0) {
        seats.forEach((seat, idx) => {
            if (selectedSeats.indexOf(idx) > -1) {
                seat.classList.add('selected');
            } else {
                seat.classList.remove('selected');
            }
        });
    }

    const selectedMovieIdx = localStorage.getItem('selectedMovieIdx');

    if (selectedMovieIdx != null) {
        movieSelect.selectedIndex = selectedMovieIdx;
    }
};

populateUI(seats1, 'selectedSeatsA');
populateUI(seats2, 'selectedSeatsB');
populateUI(seats3, 'selectedSeatsC');

// Save selected movie idx and price
const setMovieData = (movieIdx) => {
    localStorage.setItem('selectedMovieIdx', movieIdx);
};

// Update tototal price
const updateGrandTotal = () => {
    const totalA = parseInt(total.innerText) || 0;
    const totalB = parseInt(total2.innerText) || 0;
    const totalC = parseInt(total3.innerText) || 0;
    grandTotal.innerText = totalA + totalB + totalC;
}

// Update total and count
const updateSelectedCount = (seats, countElement, totalElement, storageKey, ticketPrice) => {
    const selectedSeats = [...seats].filter(seat => seat.classList.contains('selected'));
    const seatsIndex = selectedSeats.map(seat => [...seats].indexOf(seat));
    const selectedSeatsCnt = selectedSeats.length;

    localStorage.setItem(storageKey, JSON.stringify(seatsIndex));

    countElement.innerText = selectedSeatsCnt;
    totalElement.innerText = selectedSeatsCnt * ticketPrice;

    updateGrandTotal();
};

// Seat Click Event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('A-seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount(seats1, count, total, 'selectedSeatsA', ticketPriceA);
    }
});

container2.addEventListener('click', (e) => {
    if (e.target.classList.contains('B-seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount(seats2, count2, total2, 'selectedSeatsB', ticketPriceB);
    }
});

container3.addEventListener('click', (e) => {
    if (e.target.classList.contains('C-seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount(seats3, count3, total3, 'selectedSeatsC', ticketPriceC);
    }
});

// Clear button click event
clearBtn.addEventListener('click', () => {
    localStorage.removeItem('selectedSeatsA');
    populateUI(seats1, 'selectedSeatsA');
    updateSelectedCount(seats1, count, total, 'selectedSeatsA', ticketPriceA);
});

clearBtn2.addEventListener('click', () => {
    localStorage.removeItem('selectedSeatsB');
    populateUI(seats2, 'selectedSeatsB');
    updateSelectedCount(seats2, count2, total2, 'selectedSeatsB', ticketPriceB);
});

clearBtn3.addEventListener('click', () => {
    localStorage.removeItem('selectedSeatsC');
    populateUI(seats3, 'selectedSeatsC');
    updateSelectedCount(seats3, count3, total3, 'selectedSeatsC', ticketPriceC);
});

// Initial count and total set
updateSelectedCount(seats1, count, total, 'selectedSeatsA', ticketPriceA);
updateSelectedCount(seats2, count2, total2, 'selectedSeatsB', ticketPriceB);
updateSelectedCount(seats3, count3, total3, 'selectedSeatsC', ticketPriceC);
