/**
 * App launch.
 *
 * Created by RafahCSilva.
 */
$( function () {
  // OPEN MODAL BUTTON
  $( '#btn_modal_open' ).on( 'click', function () {
    $( '#modal_svg2abb' ).modal( 'show' );
  } );
  
  // CONVERSION BUTTON
  $( '#modal_btn_svg2abb' ).on( 'click', function () {
    
    var fileEscolhido1 = $( '#fileEscolhido1' );
    var fileEscolhido2 = $( '#fileEscolhido2' );
    var inputFile      = $( '#inputFile' );
    var paperW         = $( '#paperW' );
    var paperH         = $( '#paperH' );
    var check_log      = $( '#check_log' );
    var check_comment  = $( '#check_comment' );
    
    /// COMMENTS
    allowLog = check_log.is( ':checked' );
    ABB.enableComments( check_comment.is( ':checked' ) );
    
    // Papel Cartolina 660 mm x 500 mm
    var w       = paperW.val(),
        h       = paperH.val(),
        paperA2 = {
          height: w == '' ? 500 : h,
          width: w == '' ? 660 : w,
        };
    
    var xmlDoc;
    if ( fileEscolhido1.is( ':checked' ) ) {
      xmlDoc = getSvgFromServer( 'assets/svg/img_example.svg' );
    } else if ( fileEscolhido2.is( ':checked' ) ) {
      if ( !SVG_FROM_FILE ) {
        return;
      }
      xmlDoc = SVG_FROM_FILE;
      
    } else {
      return;
    }
    
    $( '#modal_svg2abb' ).modal( 'hide' );
    
    var image = PARSE( xmlDoc );
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
  $( '[data-toggle="tooltip"]' ).tooltip( { trigger: 'hover' } );
} );