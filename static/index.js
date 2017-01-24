$(function () {
    //样式初始化
    var tmp = $('.tmp');
    var total = 0;
    $.each(tmp, function (i) {
        var str = tmp.eq(i).next().attr('style').split(':');
        str = str[1].split('%');
        if (str[0] > 10){
            $(this).hide();
            $(this).next().find('span').show();
        }else{
            $(this).show();
            $(this).next().find('span').hide();
        }
    });

    var num =$('.num');
    $.each(num, function (i) {
       total += parseInt(num.eq(i).text())
    });

    //点击事件
    $('.btn').click(function () {
        var input = $('input:checked');
        $.each(tmp, function (j) {
            if (tmp.eq(j).text() == input.eq(0).val()){
                tmp.eq(j).next().attr('style', 'width:'+str+'%');
                num.eq(j).text(parseInt(num.eq(j).text()) + 1);
                var str =  'width:'+num.eq(j).text()/total*100+'%';
                tmp.eq(j).next().attr('style', str);
            }
        });
        $.ajax({
            type    : 'post',
            url     : '/Vote/index.php',
            data    : {
                'action'    : 'vote',
                'program'      : input.eq(0).val()
            },
            success:function (response) {
                //alert(response);
            }
        });

        //监控是否超过10%
        //可以为了性能问题，删除下面的循环语句
        //为了美观，可以写一个函数，以防止代码重复书写
        $.each(tmp, function (i) {
            var str = tmp.eq(i).next().attr('style').split(':');
            str = str[1].split('%');
            if (str[0] > 10){
                $(this).hide();
                $(this).next().find('span').show();
            }else{
                $(this).show();
                $(this).next().find('span').hide();
            }
        });
        $(this).attr('disabled', true);
    })
});