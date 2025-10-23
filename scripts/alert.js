export const appendAlert = (message, type) => {

    let wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
    let alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    alertPlaceholder.append(wrapper);
  }