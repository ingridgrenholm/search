import $ from "jquery";
import autocomplete from 'jquery-ui/ui/widgets/autocomplete';

  $(function() {
    
    $( "#search" ).autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: "http://api.tvmaze.com/singlesearch/shows?q=" + request.term + "&embed=episodes",
          dataType: "json",
          data: {
            q: request.term
          },

    
            success: function (data) {

              var allEposodes = data._embedded.episodes;
         
       function test() {
          for (var key in allEposodes) {
  if (allEposodes.hasOwnProperty(key)) {
    return {
    image: allEposodes[key].image.medium,
     }
  }
}
}
          
            var results = $.map(allEposodes, function (item) {



              //Extend the service data with a label and value property that autocomplete uses
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
      //JSON.stringify(data._embedded.episodes.name)
      
      minLength: 3,
       select: function( event, ui ) {
        var description = JSON.stringify(ui.item.desc);

        var stripedHtmldesc = description.replace(/<[^>]+>/g, '');

           $( "#project-description" ).text(stripedHtmldesc);
     

        return false;
    
       }
    })
    .autocomplete( "instance" )._renderItem = function( ul, item ) {
      return $( "<li>" )
           .append( "<img src='" + item.image + "' />" + item.label + "<br><span>Season: </span>"+ item.season+ "<br><br>")
        .appendTo( ul );
    };
  });





