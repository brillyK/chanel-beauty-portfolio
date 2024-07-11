let resizeTime = null
$(function () {
    mainScroll.init()

    $('.main_content').smoothWheel()

    $('.main_content').on('mousewheel', function (e) {
        var wheelDelta = e.originalEvent.wheelDelta
        if (wheelDelta > 0) {
            $(this).scrollLeft(-wheelDelta + $(this).scrollLeft())
        } else {
            $(this).scrollLeft(-wheelDelta + $(this).scrollLeft())
        }
    })
    $('.js_btn_first').click(function () {
        $('#header_warp .cover').css({
            width: '0px',
        })
        //$(".card9").removeClass("is-fixed")
        $('.main_content').animate(
            {
                scrollLeft: 0,
            },
            1000,
            function () {
                $('#header_warp .cover').css({
                    left: 0,
                    right: 'auto',
                    height: '71px',
                    width: '100%',
                })
            },
        )
    })
    $(window).resize(function () {
        mainScroll.winWidth = $(window).width()
        mainScroll.scrollLeft = $('.main_content').scrollLeft()
        mainScroll.init()
    })
})

var mainScroll = {
    winWidth: $(window).width(),
    scrollLeft: $('.main_content').scrollLeft(),
    contentsWidth: [],
    contentsWidthTotal: 0,

    init: function () {
        mainScroll.contentsWidth = []
        mainScroll.contentsWidthTotal = 0
        $('.vertical_scroll > div').each(function () {
            mainScroll.contentsWidth.push($(this).width())
            mainScroll.contentsWidthTotal += $(this).width()
        })

        $('.vertical_scroll').width(this.contentsWidthTotal)
        mainScroll.switch()

        //$(".main_content").scrollLeft(12350)
    },

    switch: function () {
        //console.log(this.scrollLeft)
        /* 상단 Invert 사이즈 조정 */
        if (mainScroll.scrollLeft <= mainScroll.winWidth * 2) {
            mainScroll.coverSet()
        }

        /* Card1 이미지 회전 */
        if (this.scrollLeft <= this.winWidth) {
            this.card1Rotate()
        }

        /* Card2 텍스트 애니메이션 */
        this.card2Text()

        /* Card2 이미지 애니메이션 */
        this.card2Img()

        /* Card4 이미지 애니메이션 */
        this.card4Img()

        /* Card6 텍스트 애니메이션 */
        this.card6Text()

        /* Card6 이미지 애니메이션 */
        this.card6Img1()
        this.card6Img2()
        this.card6Img3()

        /* Card9 이미지 고정 */
        //this.card9Fixed()

        /* Card10 상단 Ivert 사이즈 조정 */
        let card10Left = $('.card10').offset().left - this.winWidth
        if (card10Left < this.winWidth) {
            if (card10Left > 0) {
                card10Left = 0
            }
            this.lastCoverSet(-card10Left)
        }
    },

    coverSet: function () {
        let intv = mainScroll.winWidth - mainScroll.scrollLeft
        if (intv < 0) {
            intv = 0
        }
        $('#header_warp .cover').css({
            left: -1,
            right: 'auto',
            height: '71px',
        })
        $('#header_warp .cover').width(intv + 1)
    },

    lastCoverSet: function (w) {
        $('#header_warp .cover').css({
            left: 'auto',
            right: -1,
            height: '72px',
        })
        $('#header_warp .cover').width(w + 1)
    },

    card1Rotate: function () {
        let ratio = mainScroll.scrollLeft / mainScroll.winWidth
        let angle = ratio * 360
        $('.card1 .content_area .img_rotate img').css({
            transform: 'rotate(' + angle + 'deg)',
        })
    },

    card2Text: function () {
        let start = 300
        let end = 800

        if (this.scrollLeft > end + 500) {
            return false
        }

        let standard = this.scrollLeft - start
        if (standard < 0) {
            standard = 0
        }
        if (standard > end) {
            standard = end
        }

        let ratio = standard / end
        let up = 146 - 146 * ratio

        $('.card2 .text_area .text div').css({
            transform: 'translateY(' + up + 'px)',
            opacity: ratio,
        })
    },

    card2Img: function () {
        let objWidth = $('.card2 .img').width()
        let objLeft = $('.card2 .img').offset().left
        let space = 50
        let start = this.winWidth + space
        let end = this.winWidth - objWidth - space
        let max = start - end

        if (objLeft < 0 || objLeft > this.winWidth + 300) {
            return false
        }

        let standard = start - $('.card2 .img').offset().left
        if (standard < 0) {
            standard = 0
        }
        if (standard > max) {
            standard = max
        }

        let ratio = standard / max
        let opacity = ratio
        let up = 100 * ratio - 100

        $('.card2 .img').css({
            transform: 'translateY(' + up + 'px)',
            opacity: opacity,
        })
    },

    card4Img: function () {
        let objWidth = $('.card4 .img_area').width()
        let objLeft = $('.card4 .img_area').offset().left
        let space = 50
        let start = this.winWidth + space
        let end = this.winWidth - objWidth - space
        let max = start - end

        if (objLeft < 0 || objLeft > this.winWidth + 300) {
            return false
        }

        let standard = start - $('.card4 .img_area').offset().left
        if (standard < 0) {
            standard = 0
        }
        if (standard > max) {
            standard = max
        }

        let ratio = standard / max
        let opacity = ratio
        let up = 100 * ratio - 100

        $('.card4 .img_area .img1').css({
            transform: 'translateY(' + up + 'px)',
            opacity: opacity,
        })

        $('.card4 .img_area .img2').css({
            transform: 'translateY(' + -up + 'px)',
            opacity: opacity,
        })
    },

    card6Text: function () {
        let objWidth = $('.card6 .text_area .text').width()
        let objLeft = $('.card6 .text_area').offset().left
        let space = 100
        let move = 1121
        let start = this.winWidth - objWidth - space
        let end = -(move - space)

        let max = start - end
        let standard = start - objLeft
        if (standard < 0) {
            standard = 0
        }
        if (standard > max) {
            standard = max
        }

        let ratio = standard / max
        let left = ratio * move
        $('.card6 .text_area .text').css({
            left: left,
        })
    },

    card6Img1: function () {
        let objWidth = $('.card6 .img_area .img1').width()
        let objLeft = $('.card6 .img_area .img1').offset().left
        let space = 250
        let start = this.winWidth + space
        let end = this.winWidth - objWidth - space
        let max = start - end

        if (objLeft < 0 || objLeft > this.winWidth + 500) {
            return false
        }

        let standard = start - $('.card6 .img_area .img1').offset().left
        if (standard < 0) {
            standard = 0
        }
        if (standard > max) {
            standard = max
        }

        let ratio = standard / max
        let opacity = ratio
        let up = 100 * ratio - 100

        $('.card6 .img_area .img1').css({
            transform: 'translateY(' + up + 'px)',
            opacity: opacity,
        })
    },

    card6Img2: function () {
        let objWidth = $('.card6 .img_area .img2').width()
        let objLeft = $('.card6 .img_area .img2').offset().left
        let space = 250
        let start = this.winWidth + space
        let end = this.winWidth - objWidth - space
        let max = start - end

        if (objLeft < 0 || objLeft > this.winWidth + 500) {
            return false
        }

        let standard = start - $('.card6 .img_area .img2').offset().left
        if (standard < 0) {
            standard = 0
        }
        if (standard > max) {
            standard = max
        }

        let ratio = standard / max
        let opacity = ratio
        let up = 100 * ratio - 100

        $('.card6 .img_area .img2').css({
            transform: 'translateY(' + -up + 'px)',
            opacity: opacity,
        })
    },

    card6Img3: function () {
        let objWidth = $('.card6 .img_area .img3').width()
        let objLeft = $('.card6 .img_area .img3').offset().left
        let space = 250
        let start = this.winWidth + space
        let end = this.winWidth - objWidth - space
        let max = start - end

        if (objLeft < 0 || objLeft > this.winWidth + 500) {
            return false
        }

        let standard = start - $('.card6 .img_area .img3').offset().left
        if (standard < 0) {
            standard = 0
        }
        if (standard > max) {
            standard = max
        }

        let ratio = standard / max
        let opacity = ratio
        let up = 100 * ratio - 100

        $('.card6 .img_area .img3').css({
            transform: 'translateY(' + up + 'px)',
            opacity: opacity,
        })
    },

    card9Fixed: function () {
        let card9Left = $('.card9').offset().left
        if (card9Left <= 0 && !$('.card9').hasClass('is-fixed')) {
            $('.card9').addClass('is-fixed')
        } else if (card9Left >= 0 && $('.card9').hasClass('is-fixed')) {
            $('.card9').removeClass('is-fixed')
        }
    },
}

var wAniMain = {
    init: function () {
        $('.card').each(function () {
            var winWidth = $(window).width()
            var left = $(this).offset().left
            var w = $(this).width()
            if (left < winWidth && left > w * -1) {
                $(this)
                    .find('.wani_main')
                    .not('.wAnimated')
                    .each(function () {
                        if ($(this).offset().left < winWidth - $(this).outerWidth() && $(this).offset().left > 0) {
                            if ($(this).data('wani-delay')) {
                                $(this).css({
                                    'animation-delay': $(this).data('wani-delay'),
                                })
                            }
                            //console.log($(this))
                            $(this).addClass('wAnimated')
                        }
                    })
            } else if ((left >= winWidth && left <= winWidth + 200) || (left <= w * -1 && left >= w * -1 - 200)) {
                $(this).find('.wani_main.wAnimated').removeClass('wAnimated')
            }
        })
    },
}
