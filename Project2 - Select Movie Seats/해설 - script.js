const container = document.querySelector('.container');     /* querySelector: 괄호 속에 제공한 선택자와 일치하는, 문서 내 첫번째 Element를 반환*/
const seats = document.querySelectorAll('.row.seat:not(.occupied)');    
const cound = document.querySelector('#count');         /* id: #사용, class: .사용 */ /* count라는 id를 가진 span 요소를 선택해 cound에 저장 */
const total = document.querySelector('#total');         /* total이라는 id를 가진 span 요소를 선택해 total 변수에 저장 */
const movieSelect = document.querySelector('#movie');
const clearBtn = document.querySelector('.clear');


let ticketPrice = +movieSelect.value;   /* 선택된 영화의 가격을 가져와 ticketPrice에 저장, +연산자는 문자열을 숫자로 변환 */

// Get data from localStorage and populate UI
const populateUI = () => {      /* localStorage에서 선택된 좌석 정보를 가져와 UI를 초기화하거나 업데이트한다. */
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));    /* localStorage에서 'selectSeats'라는 키로 저장된 데이터를 가져온다. 
                                                                                JSON.parse를 통해 JSON문자열의 구문을 분석하고 JS값이나 객체를 생성. */
    if(selectedSeats !== null && selectedSeats.length > 0) {    /* selectedSeats가 null이 아니고, 배열의 길이가 0보다 큰 경우(선택된 좌석이 있는 경우) */
        seats.forEach((seat, idx) => {      /* seat, idx를 매개변수로 받아 모든 좌석 순회 */
            if(selectedSeats.indexOf(idx) > -1) {       /* 현재 좌석의 idx가 selectedSeats 배열에 있는지 확인: 없으면 -1 반환 */
                seat.classList.add('selected');         /* 해당 좌석에 selected 클래스를 추가 -> 선택된 좌석 표시 */
            }
        })
    } else {
        seats.forEach(seat => {
            seat.classList.remove('selected');      /* 선택된 좌석이 없을 경우, 모든 좌석을 선택되지 않은 경우로 초기화 */
        })
    }

    const selectedMovieIdx = localStorage.getItem('selectedMovieIdx');      /* localStorage에서 selectedMovieIdx 키로 저장된 영화 인덱스를 가져온다.  */

    if (selectedMovieIdx != null) {
        movieSelect.selectedIndex = selectedMovieIdx;       /* selectedMovieIdx가 null이 아니면 영화 선택 드롭다운에서 해당 인덱스를 선택 상태로 설정 */
    }
}

// Save selected movie idx and price
const setMovieData = (movieIdx, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIdx);       /* 선택된 영화의 인덱스와 가격을 받아와 localStorage에 저장한다.*/
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and cnt
const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');     /* .row .seat.selected 선택자를 사용해 선택된 모든 좌석 요소를 가져옴. */
    const seatsIndex = [...selectedSeats].map(seat => {     /* selectedSeats는 NodeList이므로 배열 메서드 사용불가, ...(스프레드 연산자)를 사용하여 
                                                                배열로 변환. 배열로 변환하였기 때문에 배열 메서드인 mal() 사용 가능 */
        return [...seats].indexOf(seat);        /* seats: 모든 좌석 요소의 배열, 스프레드 연산자를 사용하여 배열로 변환. indexOf(seat): seat가 seats에서
                                                    몇 번째 인덱스에 위치하는지 반환, 존재하지 않으면 -1 반환 */
    });
    const selectedSeatsCnt = selectedSeats.length;      /* 선택 좌석의 총 개수를 계산하여 저장 */

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))   /* 선택된 좌석의 인덱스를 localStorage에 저장. JS객체를 JSON문자열로 변환. */

    count.innerText = selectedSeatsCnt;     /* 선택된 좌석 수 UI에 표시 */
    total.innerText = selectedSeatsCnt * ticketPrice;       /* 선택된 좌석 수에 따른 총가격 UI에 표시 */
}



// Movie select Event
movieSelect.addEventListener('change', e => {       /* movieSelect: 영화 선택 드롭다운 요소, addEvenetListener('change', ... ): 드롭다운에서 선택이 변경
                                                        될 때 이벤트 감지 */
    ticketPrice = +e.target.value;          /* 드롭다운에서 선택 옵션의 value 속성, e.target.value: 선택된 영화 가격 +연산자: 값을 문자열에서 숫자형으로 변환.  */
    setMovieData(e.target.selectedIndex, e.target.value);   /* setMovieData: 선택된 영화의 인덱스와 가격을 localStorage에 저장하는 역할.  */
    updateSelectedCount()           /* 선택된 좌석 수 및 총 가격 업데이트 */
})

// Seat Click Event
container.addEventListener('click', (e) => {        /* 클릭 이벤트가 발생할 때마다 addEventListener 지정된 함수가 실행되도록 설정 */
    if (e.target.classList.contains('seat') &&          /* 클릭된 요소가 seat 클래스인지 확인 */
        !e.target.classList.contains('occupied')        /* 클릭된 요소가 occupied 클래스가 아닌지 확인 */
    ) {
        e.target.classList.toggle('selected');      /* 위의 조건이 참이라면, toggle: 켜고 끄는 역할, toggle('selected'): selected 상태로 변환*/
                                                    /* 아직 selected 클래스가 없다면 추가 */
        updateSelectedCount();                  /* 업데이트 */
    }
})

// clear btn click event
clearBtn.addEventListener('click', () => {      /* 버튼을 클릭 시 실행되도록 설정 */
    localStorage.clear();           /* localStorage에 저장된 데이터들을 모두 지우기 */
    console.log('clear btn clicked');       /* 브라우저의 콘솔에 메시지 출력(버튼이 클릭되었음을 알 수 있음) */
    populateUI()            /* UI를 초기 상태로 되돌림. localStorage에서 데이터를 가져오지 않으므로 모든 좌석 상태를 초기화, 드롭다운 값도 기본값으로 설정 */
    updateSelectedCount();      /* 업데이트 */
})

// Initial ctn and total set
updateSelectedCount();      /* 업데이트 */