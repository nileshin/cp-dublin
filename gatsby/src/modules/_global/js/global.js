import jQuery from 'jquery';

var $ = jQuery.noConflict();

$(document).ready(function() {
  $('.main-navigation').responsiveMenu({
    menuslide_overlap: true,
  });
});

$(window).on('load', function() {});

$(window).on('resize', function() {});

$(window).on('scroll', function() {});
