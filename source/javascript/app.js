/**
 *
 *
 * Created by RafahCSilva.
 */

preOUT.clear();

function btn_svg2abb_click() {
  var xmlDoc = getSvgFromFile();
  
  var title = xmlDoc.getElementsByTagName( "title" )[ 0 ].childNodes[ 0 ].textContent;
  preOUT.println( title );
}

$( function () {
  $( '#btn_svg2abb' ).on( 'click', btn_svg2abb_click );
} );