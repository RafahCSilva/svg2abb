/**
 * Utils.
 *
 * Created by RafahCSilva.
 */

/**
 * Util for print contents in &lt;pre&gt; element called #preOUT.
 */
var preOUT = {
  pre: $( '#preOUT' ),
  /**
   * Print in &lt;pre&gt;.
   * @param s
   */
  print: function ( s ) {
    this.pre.append( s );
  },
  /**
   * Print in &lt;pre&gt; with break line.
   * @param s
   */
  println: function ( s ) {
    this.print( s + "\n" );
  },
  /**
   * Clear &lt;pre&gt; contents.
   */
  clear: function () {
    this.pre.empty();
  },
};

/**
 * load svg file like xml from server.
 *
 * @param {string} link
 * @return {Document}
 */
function getSvgFromServer( link ) {
  var xHttp = new XMLHttpRequest();
  xHttp.open( "GET", link, false );
  xHttp.send();
  
  return xHttp.responseXML;
}

/**
 * load svg file like xml from file input.
 */
var SVG_FROM_FILE;
$( function () {
  // Check for the various File API support.
  if ( !window.File && !window.FileReader && !window.FileList && !window.Blob ) {
    alert( 'The File APIs are not fully supported in this browser.' );
    return null;
  }
  
  var reader;
  function handleFileSelect( evt ) {
    reader             = new FileReader();
    reader.onerror     = function ( evt ) {
      switch ( evt.target.error.code ) {
        case evt.target.error.NOT_FOUND_ERR:
          alert( 'File Not Found!' );
          break;
        case evt.target.error.NOT_READABLE_ERR:
          alert( 'File is not readable' );
          break;
        case evt.target.error.ABORT_ERR:
          break; // noop
        default:
          alert( 'An error occurred reading this file.' );
      }
    };
    reader.onload      = function ( e ) {
      SVG_FROM_FILE = (new DOMParser()).parseFromString( e.target.result, "image/svg+xml" );
    };
    
    // Read in the image file as a binary string.
    reader.readAsBinaryString( evt.target.files[ 0 ] );
  }
  
  document.getElementById( 'inputFile' ).addEventListener( 'change', handleFileSelect, false );
} );

var MSG = {
  alert_msg: $( '#alert_msg' ),
  sucesso: function ( text ) {
    this.alert_msg.attr( 'class', 'alert alert-success' );
    this.alert_msg.html( '<i class="fa fa-check fa-lg" aria-hidden="true"></i>&nbsp;&nbsp;' + text );
    this.alert_msg.slideDown();
    this.alert_msg.delay( 3000 ).slideUp();
  },
  erro: function ( text ) {
    this.alert_msg.attr( 'class', 'alert alert-danger' );
    this.alert_msg.html( '<i class="fa fa-exclamation-triangle fa-lg" aria-hidden="true"></i>&nbsp;&nbsp;' + text );
    this.alert_msg.slideDown();
    this.alert_msg.delay( 3000 ).slideUp();
  },
};

/**
 * Allows Console Print message.
 *
 * @type {boolean}
 */
var allowLog = false;

/**
 * Print Element in Console.
 *
 * @param elem
 */
function cLogElement( elem ) {
  if ( allowLog ) {
    console.log( elem );
  }
}

/**
 * Print Element in Console.
 *
 * @param elem1
 * @param elem2
 */
function cLogElement2( elem1, elem2 ) {
  if ( allowLog ) {
    console.log( elem1, elem2 );
  }
}

/**
 * Print Log in Console.
 */
function cLog() {
  if ( allowLog ) {
    var text = '';
    for ( var i = 0; i < arguments.length; i++ ) {
      text += arguments[ i ] + ' ';
    }
    console.log( text );
  }
}
