$(function () {
    /*
	$("form").submit(function(){
		let url = webi_url+"/ajax/setToken.php"
		Webi.ajax(url, "json", "", Webi.setToken, $(this));
	})
	*/

    $('body').on('keyup', 'input.w-number', function () {
        var data = Num.noComma($(this).val())
        $(this).val(Num.numberFormat(data))
    })
})

// NOTE: 공통 스크립트
const Webi = {
    ajax: function (url, dataType, data, callbackFunc, obj) {
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            dataType: dataType,
            async: false,
            cache: false,
            success: function (data, textStatus) {
                if (callbackFunc) {
                    callbackFunc(obj, data)
                }
            },
            error: function (request, status, error) {
                // 오류가 발생했을 때 호출된다.
                let url2 = webi_url + '/ajax/sendSlackErr.php'
                let data =
                    'code=' +
                    request.status +
                    '&message=' +
                    request.responseText +
                    '&error=' +
                    error +
                    '&url=' +
                    url +
                    '&path=' +
                    window.location.pathname
                $.ajax({
                    url: url2,
                    type: 'POST',
                    data: data,
                    dataType: 'json',
                    async: false,
                    cache: false,
                    success: function (data, textStatus) {},
                })
                alert('Ajax 통신에 오류가 발생하였습니다.\n관리자에게 문의해주세요.')
            },
        })
    },

    setToken: function (obj, data) {
        $(obj).find('input[name=wToken]').remove()
        var html = "<input type='hidden' name='wToken' value='" + data + "'>"
        obj.prepend(html)
    },
}

// NOTE: 숫자 관련 스크립트
const Num = {
    noComma: function (data) {
        var tmp = ''
        var comma = ','
        var i

        for (i = 0; i < data.length; i++) {
            if (data.charAt(i) != comma) tmp += data.charAt(i)
        }
        return tmp
    },

    numberFormat: function (data) {
        var tmp = ''
        var number = ''
        var cutlen = 3
        var comma = ','
        var i

        data = data + ''

        var sign = data.match(/^[\+\-]/)
        if (sign) {
            data = data.replace(/^[\+\-]/, '')
        }

        len = data.length
        mod = len % cutlen
        k = cutlen - mod
        for (i = 0; i < data.length; i++) {
            number = number + data.charAt(i)

            if (i < data.length - 1) {
                k++
                if (k % cutlen == 0) {
                    number = number + comma
                    k = 0
                }
            }
        }

        if (sign != null) number = sign + number

        return number
    },
}

// NOTE: 하이픈 스크립트
var hyphen = {
    remove: function (val) {},
    add: function (type, value) {
        addValue = []
        value = value.replace(/-/gi, '')
        if (type == 'tel') {
            if (value.substring(0, 2) == '02') {
                // 서울 번호를 체크하기 위한 조건
                addValue.push(value.substring(0, 2))
                if (value.length >= 3) {
                    var endKey = value.length >= 10 ? 6 : 5 // 00-000-000, 00-0000-0000 처리
                    addValue.push(value.substring(2, endKey))
                    if (value.length >= 6) {
                        if (value.length >= 10) {
                            // 10자리 이상 입력 방지
                            value = value.substring(0, 10)
                        }
                        addValue.push(value.substring(endKey, value.length))
                    }
                }
            } else {
                addValue.push(value.substring(0, 3))
                if (value.length >= 4) {
                    var endKey = value.length >= 11 ? 7 : 6 // 000-000-0000, 000-0000-0000 처리
                    addValue.push(value.substring(3, endKey))
                    if (value.length >= 7) {
                        if (value.length >= 11) {
                            // 11자리 이상 입력 방지
                            value = value.substring(0, 11)
                        }
                        addValue.push(value.substring(endKey, value.length))
                    }
                }
            }
        } else if (type == 'corp') {
            addValue.push(value.substring(0, 3))
            if (value.length >= 4) {
                var endKey = 5 // 000-000-0000, 000-0000-0000 처리
                addValue.push(value.substring(3, endKey))
                if (value.length >= 6) {
                    if (value.length >= 10) {
                        // 11자리 이상 입력 방지
                        value = value.substring(0, 10)
                    }
                    addValue.push(value.substring(endKey, value.length))
                }
            }
        }

        return addValue.join('-')
    },
}

const wAlert = {
    //note 기본 알림창 열기
    open: function (msg, action_title, action, cancel_title) {
        if (!$('.common__alert').length) {
            $('body').append(this.alertForm())
        }

        if (action_title) {
            $('.common__alert').removeClass('box_alert')
            $('.common__alert').addClass('box_confirm')
            //$(".common__alert .alert__foot").prepend('<button class="is-action" onclick="'+action+'">'+action_title+'</button>');
            if (action_title) {
                $('.common__alert .alert__foot .is-confirm').attr('onclick', action).html(action_title)
            }
            if (cancel_title) {
                $('.common__alert .alert__foot .is-cancel').html(cancel_title)
            }
        } else {
            $('.common__alert').addClass('box_alert')
            $('.common__alert').removeClass('box_confirm')
            $('.common__alert .alert__foot .is-confirm').html('확인')
        }
        $('.common__alert .alert__content p').html(msg)
        $('.common__alert').addClass('is-active')

        //alert(msg);
    },

    //note 기본 알림창 닫기
    close: function () {
        $('.common__alert').removeClass('is-active')
    },

    alertForm: function () {
        html = ''
        html += '<div class="common__alert alert-bg is-alert">'
        html += '	<div class="alert-bg--inner">'
        html += '		<div class="alert">'
        html += '			<div class="alert__content">'
        html += '				<p></p>'
        html += '			</div>'
        html += '			<div class="alert__foot">'
        html += '				<button class="is-cancel" onclick="wAlert.close();">취소</button>'
        html += '				<button class="is-confirm" onclick="wAlert.close();">확인</button>'
        html += '			</div>'
        html += '		</div>'
        html += '	</div>'
        html += '</div>'

        return html
    },
}
