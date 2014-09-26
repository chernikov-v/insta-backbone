'use strict';

/**
 * Created by vladimir on 28.07.14.
 */


    var goTop = function(){
    $('html, body').animate({ scrollTop: 0 }, 'slow');
};
var focusToInput = function(element)
{
    $(element).closest('.image-block').find('.commentsField').focus()
}