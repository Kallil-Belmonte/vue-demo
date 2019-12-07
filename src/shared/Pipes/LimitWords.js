import Vue from 'vue';

Vue.filter('limitWords', function (value, numberOfWords) {
  if (value.split(' ').length > numberOfWords) {
    return value.split(' ').splice(0, numberOfWords).join(' ') + '...';
  }

  return value;
})
