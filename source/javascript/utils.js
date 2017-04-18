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
 * load svg file like xml.
 *
 * @return Document
 */
function getSvgFromFile() {
  var xhttp = new XMLHttpRequest();
  xhttp.open( "GET", "assets/svg/img_final.svg", false );
  xhttp.send();
  
  return xhttp.responseXML;
}

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
