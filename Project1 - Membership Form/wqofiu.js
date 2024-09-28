const form = document.getElementById('form');       // html에서 id가 form인 요소를 선탁하여 form변수에 저장
const username = document.getElementById('username');   // html에서 id가 username인 요소를 선택하여 username변수에 저장
const email = document.getElementById('email');     // html에서 id가 email인 요소를 선택하여 email 변수에 저장
const password = document.getElementById('password');   // html에서 id가 password인 요소를 선택하여 password 변수에 저장
const password2 = document.getElementById('password2');     // html에서 id가 password2인 요소를 선택하여 password2 변수에 저장

// Show input error message
const showError = (input, message) => {     // 화살표 함수: 화살표 기준 왼쪽에 있는 것들을 인자로 하여 인자들을 오른쪽에 있는 변수로 반환하는 것
                                            // ex) let func = (arg1, arg2, ...argN) => expression	====>>>> let func = function(arg1, arg2, ...argN) {   return expression;   };의 축약버전
                                            // 이 함수의 경우 오른쪽의 매개변수를 받아 showError라는 이름의 화살표 함수를 정의.
  const formControl = input.parentElement;      // input 요소의 부모 요소를 formControl 변수에 저장. input 요소의 부모 요소는 form-control 클래스
  formControl.className = 'form-control error';     // formControl의 클래스를 form-control error로 설정. -> css 스타일 적용-> 빨간색 시각적 효과
  const small = formControl.querySelector('small');     // formControl 내에서 small 요소를 선택해 small 변수에 저장. 이 small 변수는 오류 메시지를 표시할 때 사용
  small.innerText = message;        // small 요소의 텍스트를, 매개변수 message로 설정. 
}

// Show success outline
const showSuccess = (input) => {                // showSuccess 화살표 함수 정의 -> input 매개변수 받음
  const formControl = input.parentElement;      // input 요소의 부모요소를 formControl 변수에 저장. input의 부모요소는 .form-control 클래스를 가진 요소
  formControl.className = 'form-control success';       // 앞의 코드에서 input의 부모요소를 formControl에 저장했으므로 formControl도 input의 부모요소, 이 부모 요소 클래스를 form-control success로 설정. 
                                                        // => 이제 formControl은 .form-control과 form-control success라는 두 클래스를 가지게 됨. form-control: 기본 스타일을 적용하기 위한 클래스, success: 성공 상태를 나타내기 위한 클래스
}

// Check email is valid
const isValidEmail = (email) => {           // email을 매개변수로 받아  isValidEmail이라는 화살표 함수 정의.
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;   // 이메일의 유효성을 검사하는 정규 표현식
  if (re.test(email.value)) {               // email.value가 정규 표현식 re와 일치하는지 검사. test 메서드는 유효한 이메일 주소일 경우 true, 그렇지 않으면 false 반환
    showSuccess(email)                  // email이 유효할 경우 showSuccess 함수를 호출하여 이메일 입력 필드에 성공 상태 표시
  } else {
    showError(email, 'Email is not valid');         // email이 유효하지 않은 경우 showError 함수를 호출하여 이메일 입력 필드에 오류 상태를 표시
  }
}

// Get field name
const getFieldName = (input) => {                   // 매개변수 input을 받는 getFieldName 화살표 함수 정의.
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);      // input.id: 입력 필드의 id 속성 가져오기. ex) id가 username라면 username 가져옴. charAt(0).toUpperCase(): id의 첫번째 문자(charAt(0))을 가져와 대문자로 변환. username라면 U가 됨. 
                                                                    // slice(1): id의 첫번째 문자를 제외한 나머지 부분 가져오기. username일 경우 sername. +로 이어져 있으므로 U와 sername 결합 -> Username. 최종적으로 username이라는 id를 가진 입력 필드에 대해 Username 반환.
}                                                       // slice 메서드: let str = "hello"; let slicedStr = str.slice(1); 
                                                        // 결과: "ello" (인덱스 1부터 끝까지 잘라냄) let slicedStr2 = str.slice(0, 3); 
                                                        // 결과: "hel" (인덱스 0부터 3 이전까지 잘라냄)

// Check required fields
const checkRequired = (inputArr) => {           // inputArr 매개변수 받고 checkRequired라는 화살표 함수 정의
  inputArr.forEach(input => {               // forEach 메서드를 사용하여 inputArr 배열의 요소 각각에 대해 실행하는 메서드
    if (input.value.trim() === '') {        // 현재 입력 필드의 값(input.value)을 가져와 trim() 메서드를 통해 공백을 제거한 후, 빈 문자열인지 확인
      showError(input, `${getFieldName(input)} is required`);   // 입력 필드가 비어있다면 showError 함수를 호출하여 오류 메시지 표시. getFieldName(input) 함수를 통해 필드의 이름을 가져와 "필드 이름 is required" 형식으로 표시됨.
    } else {
      showSuccess(input);               // 입력 필드가 채워져있다면, showSuccess 함수를 호출하여 해당 필드가 성공적으로 입력되었음을 표시.
    }
  })                            // inputArr의 매개변수에는 html 파일의 input 요소들만 받을 수 있다. html 파일에 input 요소들은 username 필드, email 필드, password 필드, confirm password 필드가 있다.
}

// Check input length
const checkLength = (input, min, max) => {      // input: 검사할 입력 필드의 DOM 요소, min: 입력의 최소 길이. max: 입력의 최대 길이. 이 매개변수들을 가지는 checkLength 화살표 함수를 정의한다.
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`)   // 입력 길이가 최소 길이보다 짧은 경우 showError 함수를 호출하여 오류 메시지 표시. 형식은 "필드 이름 must be at least X characters".
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be at less than ${max} characters`)   // 입력 길이가 최대 길이보다 길 경우 showError 함수를 호출하여 오류 메시지 표시. 형식은 "필드 이름 must be at least X characters".
  }
}

// Check passwords match
const checkPasswordsMatch = (input1, input2) => {       // input1: input 요소 중 password 필드, input2: input 요소 중 confirm password 필드. 이 두 매개변수를 받아 checkPasswordsMatch 화살표 함수 정의.
  if(input1.value !== input2.value) {
    showError(input2, 'Password do not match');         // 비밀번호가 일치하지 않을 경우 showError 함수를 호출하여 input2에 오류메시지 표시. 'Password do not match'
  }
}

// Event listeners
form.addEventListener('submit', e => {      // form: html에서 정의된 <form> 요소를 가리키며, 데이터를 입력받고 제출하는 역할을 함. 
                                            // addEventListener 메서드: 이 메서드는 특정 이벤트가 발생했을 때 실행할 함수를 등록하는 데 사용됨.-> submit 이벤트를 실행하는 변수명?같은 거라고 생각하면 될듯. 
                                            // 'submit' : submit 버튼을 눌렀을 때 이 이벤트 발생. e =>: 화살표 함수, submit 이벤트가 발생했을 때 실행할 함수들 정의. e는 이벤트 객체: 그냥 이벤트에 대한 정보를 담고있는 것을 이벤트 객체라고 함.
  e.preventDefault();                   // 기본 이벤트 동작 방지. -> 폼이 실제로 제출되지 않도록 하여 페이지가 이동되지 않도록 함. 백엔드와 연결하더라도 입력 필드에 들어온 정보를 확인할 때까지는 해당 페이지에서 움직이지 말아야하므로 필요한 명령어.

  checkRequired([username, email, password, password2]);    // 4가지 필수 입력 필드에 대해 checkRequired를 실행하고, 비어있을 경우 오류 메시지 표시
  checkLength(username, 8, 15);         // username 입력 필드 길이를 확인하여 위반되는 길이를 가졌을 경우 오류 메시지 표시, 최소 8/최대 15
  checkLength(password, 6, 25);
  isValidEmail(email);              // 입력된 email이 유효한 이메일 형식인지 확인. 유효하지 않을 경우 오류 메시지 표시
  checkPasswordsMatch(password, password2);     // password와 password2의 값이 일치하는지 확인. 일치하지 않으면 password2 입력 필드에 오류 메시지 표시
});