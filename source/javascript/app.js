/**
 * App launch.
 *
 * Created by RafahCSilva.
 */
$( function () {
  /// COMMENTS
  //allowLog = true;
  allowLog = false;
  
  //ABB.enableComments();
  ABB.disableComments();
  
  // CONVERSION BUTTON
  $( '#btn_svg2abb' ).on( 'click', function () {
    var xmlDoc = getSvgFromFile();
    
    var image = PARSE( xmlDoc );
    
    // Papel Cartolina 660 mm x 500 mm
    var paperA2 = {
      height: 500,
      width: 660,
    };
    
    DRAW( image, paperA2 );
  } );
  
  // COPY BUTTON
  $( '#btn_copy' ).on( 'click', function () {
    // http://stackoverflow.com/questions/1173194/select-all-div-text-with-single-mouse-click
    var range, preOUT = document.getElementById( 'preOUT' );
    
    if ( document.selection ) {
      range = document.body.createTextRange();
      range.moveToElementText( preOUT );
      range.select();
    } else if ( window.getSelection ) {
      range = document.createRange();
      range.selectNode( preOUT );
      window.getSelection().removeAllRanges();
      window.getSelection().addRange( range );
    } else {
      MSG.erro( 'Não foi possivel Copiar o Código!' );
      return;
    }
    
    if ( document.execCommand( 'copy' ) ) {
      MSG.sucesso( 'Código copiado com sucesso!' );
    } else {
      MSG.erro( 'Falha ao Copiar o Código!' );
    }
  } );
} );