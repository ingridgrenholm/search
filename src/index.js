import $ from "jquery";
import autocomplete from 'jquery-ui/ui/widgets/autocomplete';

$(function() {

    $("#search").autocomplete({
            source: function(request, response) {
                $.ajax({
                        url: "http://api.tvmaze.com/singlesearch/shows?q=" + request.term + "&embed=episodes",
                        dataType: "json",
                        data: {
                            q: request.term
                        },


                        success: function(data) {

                            var allEpisodes = data._embedded.episodes;

                            function test() {
                                for (var key in allEpisodes) {
                                    if (allEpisodes.hasOwnProperty(key)) {
                                        return {
                                            image: allEpisodes[key].image.medium,
                                        }
                                    }
                                }
                            }

                            var results = $.map(allEpisodes, function(item)

                                return {
                                    label: item.name,
                                    url: item.url,
                                    value: data.name,
                                    desc: item.summary,
                                    season: item.season,
                                    image: item.image



                                }
                            });

                        response(results);

                    }
                });
        },


        minLength: 3,
        select: function(event, ui) {
            var description = JSON.stringify(ui.item.desc);

            var stripedHtmldesc = description.replace(/<[^>]+>/g, '');

            $("#project-description").text(stripedHtmldesc);


            return false;

        }
    })
.autocomplete("instance")._renderItem = function(ul, item) {
    return $("<li>")
        .append("<img src='" + item.image + "' />" + item.label + "<br><span>Season: </span>" + item.season + "<br><br>")
        .appendTo(ul);
};
});
