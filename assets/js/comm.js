document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header')
    const section2 = document.getElementById('section2')
    const horizontalScroll = document.getElementById('horizontalScroll')

    horizontalScroll.addEventListener('wheel', function (event) {
        event.preventDefault() // 기본 스크롤 동작 방지

        const scrollStep = event.deltaY * 4 // 스크롤 속도 조절
        horizontalScroll.scrollLeft += scrollStep // 가로 스크롤 이동

        const section2Left = section2.getBoundingClientRect().left
        const windowWidth = window.innerWidth

        // section2의 왼쪽 위치가 윈도우 폭의 80%와 같아질 때 블러 효과 추가
        if (section2Left <= windowWidth * 0.8) {
            header.classList.add('blur')
        } else {
            header.classList.remove('blur')
        }
    })
})
