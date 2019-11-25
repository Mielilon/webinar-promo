//= jquery.min.js

function scrollTo(selector) {
  $([document.documentElement, document.body]).animate(
    {
      scrollTop: $(selector).offset().top
    },
    500
  )
}

function initScrollToForm() {
  $('.scroll-to-form').click(function() {
    scrollTo('.form')
  })
}

function initVideoModal() {
  $('.show-video-modal').click(function() {
    $('.modal').addClass('active')
    $('.modal video').trigger('play')
  })

  $('.modal__close, .modal').click(function() {
    $('.modal').removeClass('active')
    $('.modal video').trigger('pause')
  })

  $('.modal__content video').click(function(event) {
    event.stopPropagation()
  })
}

function initForm() {
  console.log()
  $('.form__submit').click(function() {
    let mailExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i
    let theForm = $(this).closest('form')

    if (!mailExp.test(theForm.find('input[name="email"]').val())) {
      theForm
        .find('input[name="email"]')
        .siblings('.text-field__hint')
        .text('Почта введена некорректно')
      return false
    } else {
      theForm
        .find('input[name="email"]')
        .siblings('.text-field__hint')
        .text('')
    }

    if (!$('input[name="agreement"]').is(':checked')) {
      return theForm
        .find('.form__announce-block')
        .text('Необходимо подтвердить согласие с условиями')
    }

    $.ajax({
      type: 'POST',
      url: 'mail.php',
      data: theForm.serialize()
    })
      .done(function() {
        theForm
          .find('.form__announce-block')
          .text('Сообщение успешно отправлено!')
          .addClass('mt-12')
        theForm.find('.form__submit').hide()
      })
      .fail(function() {
        theForm
          .find('.form__announce-block')
          .text('Сообщение успешно отправлено!')
          .addClass('mt-12')
        theForm.find('.form__submit').hide()
      })

    return false
  })
}

function initListSection() {
  if (screen.width < 1280) return
  $(window).scroll(function() {
    if (screen.width < 1280) return

    $('.list-section').each(function() {
      let blockHeight = $(this).height()
      let titleHeight = $(this)
        .find('.list-section__title')
        .height()

      let topOfObjToStick = $(this).offset().top + 60

      let windowScroll = $(window).scrollTop()

      let currentOffset = windowScroll - topOfObjToStick
      let maxOffset = blockHeight - titleHeight - 60
      let offset = currentOffset < maxOffset ? currentOffset : maxOffset

      if (windowScroll < topOfObjToStick) offset = 0

      $(this)
        .find('.list-section__title')
        .css('top', offset)
    })
  })
}

$(document).ready(function() {
  initListSection()
  initScrollToForm()
  initVideoModal()
  initForm()
})
