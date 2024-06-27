// 가로 스크롤
document.addEventListener('DOMContentLoaded', function () {
    const horizontalScroll = document.getElementById('horizontalScroll')

    horizontalScroll.addEventListener('wheel', function (event) {
        event.preventDefault() // 기본 스크롤 동작 방지

        const scrollStep = event.deltaY * 6 // 스크롤 속도 조절
        horizontalScroll.scrollLeft += scrollStep // 가로 스크롤 이동
    })
})
