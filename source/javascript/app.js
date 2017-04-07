/**
 * App launch.
 *
 * Created by RafahCSilva.
 */
$( function () {
  $( '#btn_svg2abb' ).on( 'click', function () {
    var xmlDoc = getSvgFromFile();
    
    var image = PARSE( xmlDoc );
    
    // Papel Sulfite A2 420 mm x 594 mm
    var paperA2 = {
      height: 420,
      width: 594,
    };
    
    DRAW( image, paperA2 );
  } );
} );