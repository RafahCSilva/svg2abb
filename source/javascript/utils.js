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
  xhttp.open( "GET", "assets/svg/trabalho.svg", false );
  xhttp.send();
  
  return xhttp.responseXML;
}
