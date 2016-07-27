
/*Sets audio file as title of fancybox*/

  $(document).ready(function() {
    $(".fancybox").fancybox({
      helpers: {
        title: "TITLE"
      }
    });

    $(".fancybox")
    .attr('rel', 'gallery')
    .fancybox({
        beforeLoad: function() {
            this.title = $(this.element).attr('caption');
        }
    });

    $(".fancybox")
    .attr('rel', 'gallery')
    .fancybox({
        beforeLoad: function() {
            var el, id = $(this.element).data('title-id');

            if (id) {
                el = $('#' + id);

                if (el.length) {
                    this.title = el.html();
                }
            }
        }
    });
  });

/*wraps each element of class fancy in a fancybox element TD 7/9
  $(document).ready(function() {
    var i=0;

    $(".fancy").each(function(i){
      var id = "title-" + (i+1);
      var href = $(this).attr("src");
      $(this).wrap("<a class='fancybox' data-title-id='"+id+"' href="+ href + " rel='gallery'></a>");
    });
  });
*/

/*wraps each img element of class fancy in a fancybox element,
pushes titles of img elements of class fancy with class audio to an array
assigns appropriate title to each audio file*/

var i = 0;
var index = 0;
var audioTitles = [];
$(document).ready(function () {

    $("img.fancy").each(function (i) {
        var id = "title-" + (i + 1);
        var href = $(this).attr("src");
        var attribute = $(this).attr("class");
        $(this).wrap("<a class='fancybox' data-title-id='" + id + "' href=" + href + "></a>");
        if (attribute.search("audio") != -1) {
            audioTitles.push(id);
        }
    });

    $("audio.fancy").each(function (index) {
        $(this).wrap("<div id='" + audioTitles[index] + "' class='hidden'></div>");
    });

});
