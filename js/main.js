window.onScrollEffect();

const swiper = new Swiper('.swiper', {
    loop: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        pagination: false,
    }
});

// ==========Маска ввода телефона ========
let phoneMask = document.querySelectorAll("input[type='tel']");

let im = new Inputmask("+7 (999) 999-99-99");
im.mask(phoneMask);

// ========JQUERY=================

$(function () {

    $('.catalog__tabs').on('click', '.catalog__item', function () {
        $(this)
            .addClass('catalog__item--active').siblings().removeClass('catalog__item--active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content--active').eq($(this).index()).addClass('catalog__content--active');
    });

    function tabsContent(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-card__box').eq(i).toggleClass('catalog-card__box--active');
                $('.catalog-card__description').eq(i).toggleClass('catalog-card__description--active');
            });
        });
    }

    tabsContent('.catalog-card__link');
    tabsContent('.catalog-card__back');


    // ==========MODAL=============
    $('[data-modal = consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn(300);
    });

    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut();
    });

    $('.catalog-card__btn').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-card__title').eq(i).text());
            $('.overlay, #order').fadeIn(300);
        });
    });

    // ===========VALIDATE================

    function valideForm(form) {
        $(form).validate({
            rules: {
                name: {
                    minlength: 2,
                },
                email: {
                    email: true,
                }
            },
            messages: {
                name: {
                    required: "Введите имя",
                    minlength: jQuery.validator.format("Введите еще {0} символа"),
                },
                phone: "Введите телефон",
                email: {
                    required: "Введите почту",
                    email: "Неверно указан адрес почты"
                }
            }
        });
    }
    valideForm('#form-cons');
    valideForm('#order .consultation-form');
    valideForm('#consultation .consultation-form');


    // ============Отправка форм на сервер =========
    $('form').submit(function (e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();
            $("form").trigger("reset");
        });
        return false;
    });


    //============= Плавный скролл=========

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 1200) {
            $('.page-up').fadeIn();
        } else {
            $('.page-up').fadeOut();
        }
    });

});