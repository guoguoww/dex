const $cookie = {
  set: function (name, value, days = 3) {
    var d = new Date;

    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);

    window.document.cookie = name + "=" + encodeURIComponent(JSON.stringify(value)) + ";path=/;expires=" + d.toGMTString();

  },

  get: function (name) {

    var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');

    return v ? decodeURIComponent(v[2]) : null;

  },

  delete: function (name) {

    this.set(name, '', -1);

  },
  clear: function () {
    var keys = window.document.cookie.match(/[^ =;]+(?=\=)/g);

    if (keys) {

      for (var i = keys.length; i--;) {

        this.set(keys[i], '', -1);

      }

    }
  }
}

export default $cookie