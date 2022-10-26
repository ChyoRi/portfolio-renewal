// 전역 변수
const main = $('#main'); // Wrapper
const allPage = $('#main > section'); // 모든 페이지 section
const allIndicator = $('#aside > .wrap > ul > li:not(.img)'); // 모든 인디케이터 변수
const dot = $('#aside > .wrap > .line > .load > .dot');
const indiImage = $('.indiImage');
const cloud1 = $('.cloud1');
const cloud2 = $('.cloud2');
const cloud3 = $('.cloud3');
let activePage = allPage?.length - 1; // 활성화 페이지
let isMoving = false;  // 현재 움직임 여부

// 인트로페이지 타이핑 함수
const TypingText = (text, to) => { 
  let i = 0;
  to.empty();

  setInterval(() => {
      i++;
      to.text(text.slice(0,i));
      i == text.length && setTimeout(()=> i = 0, 3000);
  }, 170);
}

// 페이지 업을 위한 변수 컨트롤
const pageUp = () => {
  if (activePage === 0) return;
  activePage = activePage - 1;
  pageMove('up');
}

// 페이지 다운을 위한 변수 컨트롤
const pageDown = () => {
  if (activePage === allPage?.length - 1) return;
  activePage = activePage + 1;
  pageMove('down');
}

// 로켓 클레스명 변경
const rocketChangeClassName = (state) => {
  indiImage.removeClass('up');
  indiImage.removeClass('down');
  indiImage.addClass(state);
}

// 페이지 실제 무브 함수
const pageMove = (state = 'up') => {
  isMoving = true;

  let viewHeight = $(window).outerHeight();
  let result = activePage * viewHeight * -1;

  let isFirstPage = activePage === allPage?.length - 1;
  let imgPath = isFirstPage ? './images/rocket.svg' : './images/rocket_on.svg'
  indiImage.attr('src', imgPath);
  rocketChangeClassName(state);

  if (isFirstPage) setTimeout(() => rocketChangeClassName('up'), 400);

  // 인디케이터
  let active = 100 - (100 / (allPage?.length - 1) * activePage);
  dot.css('bottom', active + '%');

  main.stop().css('top', result + 'px');
  setTimeout(() => isMoving = false, 1000);
}

// 페이지 이동 함수
const goPage = (idx) => {
  let state = activePage > idx ? 'up' : 'down';
  activePage = idx;
  pageMove(state);
}

// Wheel 이벤트 함수
const wheel = e => {
  let y = e?.originalEvent?.deltaY;

  // if (y >= 0) {  // 양수
  //   pageDown();
  // } else {  // 음수
  //   pageUp();
  // }
  if (isMoving) return;

  y >= 0 ? pageDown() : pageUp();
}

// 인디케이터 클릭
const click = e => {
  let i = $(e?.currentTarget)?.index();
  goPage(i);
}

$(window).on('wheel', wheel);
allIndicator.on('click', click);

// Cloud 애니메이션
const cloudAnimation1 = () => {
  cloud1.animate({marginLeft:'0px'},3000,'linear'); // 맨처음 딜레이
  cloud1.animate({marginLeft:'200px',opacity:1},4000,'linear'); // 처음동작
  cloud1.animate({marginLeft:'800px'},12000,'linear'); // 두번째 동작
  cloud1.animate({marginLeft:'1000px',opacity:0},4000,'linear'); // 마지막 동작
  cloud1.animate({marginLeft:'0px'},500,'linear'); // 0으로 돌아가는 딜레이
}

const cloudAnimation2 = () => {
  cloud2.animate({marginLeft:'0px'},1500,'linear'); // 맨처음 딜레이
  cloud2.animate({marginLeft:'200px',opacity:1},4000,'linear');
  cloud2.animate({marginLeft:'300px'},2000,'linear');
  cloud2.animate({marginLeft:'500px',opacity:0},4000,'linear');
  cloud2.animate({marginLeft:'0px'},1500,'linear');
}

const cloudAnimation3 = () => {
  cloud3.animate({marginLeft:'200px',opacity:1},4000,'linear');
  cloud3.animate({marginLeft:'1000px'},16000,'linear');
  cloud3.animate({marginLeft:'1200px',opacity:0},4000,'linear');
  cloud3.animate({marginLeft:'0px'},3000,'linear');
}

// Default Function
TypingText('I Do my best in everything.', $('#moongu'));
pageMove();
setInterval(cloudAnimation1,1000);
setInterval(cloudAnimation2,1000);
setInterval(cloudAnimation3,1000);
