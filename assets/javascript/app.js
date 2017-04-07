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
  xhttp.open( "GET", "assets/svg/tie-fighter.svg", false );
  xhttp.send();
  
  return xhttp.responseXML;
}
/**
 * ABB Rapid Code.
 *
 * Created by RafahCSilva.
 */

/**
 * Object to assist scale transform.
 *
 * @type {{ratioW: number, ratioH: number, setRatio: SCALE.setRatio, px2mmX: SCALE.px2mmX, px2mmY: SCALE.px2mmY}}
 */
var SCALE = {
  ratioW: 1,
  ratioH: 1,
  /**
   * Set the calc Ratio to fill image in paper.
   *
   * @param Wpx (image width in pixels)
   * @param Hpx (image height in pixels)
   * @param Wmm (paper width in mm)
   * @param Hmm (paper height in mm)
   */
  setRatio: function ( Wpx, Hpx, Wmm, Hmm ) {
    this.ratioW = Wmm / Wpx;  // (mm / px) * px = mm
    this.ratioH = Hmm / Hpx;
  },
  /**
   * Scale transforme in X axis.
   *
   * @param Xpx (in pixels)
   * @return number (in mm)
   */
  px2mmX: function ( Xpx ) {
    return Math.round( this.ratioW * Xpx );
  },
  /**
   * Scale transforme in Y axis.
   *
   * @param Ypx (in pixels)
   * @return number (in mm)
   */
  px2mmY: function ( Ypx ) {
    return Math.round( this.ratioH * Ypx );
  },
};

/**
 * Object to assist in the print of Rapid Code.
 *
 * @type {{zUP: number, v: string, z: string, tool: string, header: ABB.header, footer: ABB.footer, DOWN: ABB.DOWN, UP: ABB.UP, MOVE: ABB.MOVE}}
 */
var ABB = {
  /*
   COMMANDS
   MOVEJ = move para um pto de qlqr jeito rapido
   MOVEL = move para um pto linearmente
   
   */
  
  // Height away from paper d(50 mm = 5 cm).
  zUP: 50,
  // Velocity of moves (10 mm/s).
  v: 'v10',
  // Precision zone.
  z: 'z1',
  
  tool: 'tool0',
  
  /**
   * Print Code of program header.
   */
  header: function () {
    preOUT.println( 'MODULE MainModule' );
    preOUT.println( '  CONST robtarget p10:=[[759.02,-6.69,1122.48],[0.0668118,-0.0527993,0.994832,-0.0552913],[0,-1,-1,0],[9E+09,9E+09,9E+09,9E+09,9E+09,9E+09]];' );
    preOUT.println( '  PROC main()' );
    
    this.UP( 0, 0 );
  },
  /**
   * Print Code of program footer.
   */
  footer: function () {
    preOUT.println( '  ENDPROC' );
    preOUT.println( 'ENDMODULE' );
  },
  /**
   * Print Code for lower a tool of paper.
   *
   * @param x (in mm)
   * @param y (in mm)
   * @constructor
   */
  DOWN: function ( x, y ) {
    preOUT.println( '    MoveL Offs( p10, ' + x + ', ' + y + ', ' + this.zUP + ' ), ' + this.v + ', ' + this.z + ', ' + this.tool + ';' );
    preOUT.println( '    MoveL Offs( p10, ' + x + ', ' + y + ', ' + 0 + ' ), ' + this.v + ', ' + this.z + ', ' + this.tool + ';' );
  },
  /**
   * Print Code for lift a tool of paper.
   *
   * @param x (in mm)
   * @param y (in mm)
   */
  UP: function ( x, y ) {
    preOUT.println( '    MoveL Offs( p10, ' + x + ', ' + y + ', ' + this.zUP + ' ), ' + this.v + ', ' + this.z + ', ' + this.tool + ';' );
  },
  /**
   * Print Code for move tool of paper.
   *
   * @param x (in mm)
   * @param y (in mm)
   */
  MOVE: function ( x, y ) {
    preOUT.println( '    MoveL Offs( p10, ' + x + ', ' + y + ', ' + 0 + ' ), ' + this.v + ', ' + this.z + ', ' + this.tool + ';' );
  },
};


/**
 * Parser SVG image to ABB Rapid code.
 *
 * Created by RafahCSilva.
 */

/**
 * Class for draw instructions.
 *
 * @param doc (xmlDOM)
 * @constructor
 */
function DrawInst( doc ) {
  var root          = doc.childNodes[ 0 ];
  this.width        = root.getAttribute( 'width' );
  this.height       = root.getAttribute( 'height' );
  this.instructions = DFS( root );
}
/**
 * Element Line.
 *
 * @param doc (xml element)
 * @constructor
 */
function LINE( doc ) {
  this.x1 = doc.getAttribute( 'x1' );
  this.y1 = doc.getAttribute( 'y1' );
  this.x2 = doc.getAttribute( 'x2' );
  this.y2 = doc.getAttribute( 'y2' );
  /**
   * Draw Line in Rapid Code.
   */
  this.draw = function () {
    // scaling
    var s_x1 = SCALE.px2mmX( this.x1 );
    var s_y1 = SCALE.px2mmY( this.y1 );
    var s_x2 = SCALE.px2mmX( this.x2 );
    var s_y2 = SCALE.px2mmY( this.y2 );
    preOUT.println( '    ! line (' + s_x1 + ',' + s_y2 + ')->(' + s_x2 + ',' + s_y2 + ')' );
    
    // go to point and down
    ABB.DOWN( s_x1, s_y1 );
    // Scribble
    ABB.MOVE( s_x2, s_y2 );
    // up
    ABB.UP( s_x2, s_y2 );
  };
}

/**
 * Element Path.
 * @param doc
 * @constructor
 */
function PATH( doc ) {
  this.d = doc.getAttribute( 'd' );
  /**
   * Draw path in Rapid Code.
   */
  this.draw = function () {
    preOUT.println( '    ! path' );
  };
}

/**
 * Element Ellipse.
 * @param doc
 * @constructor
 */
function ELLIPSE( doc ) {
  // TODO: classe Elipse
  /**
   * Draw ellipse in Rapid Code.
   */
  this.draw = function () {
    preOUT.println( '    ! ellipse' );
  };
}

/**
 * Parse the xmlDOM to transforming in draw instructions.
 *
 * @param doc (xmlDOM)
 * @return {DrawInst}
 * @constructor
 */
function PARSE( doc ) {
  return new DrawInst( doc );
}

/**
 * Deep First Search in xmlDOM, return the array os instructions objects.
 *
 * @param doc (xmlDOM root)
 * @return {Array}
 * @constructor
 */
function DFS( doc ) {
  var list = [];
  _.each( doc.childNodes, function ( c ) {
    switch ( c.nodeName.toLowerCase() ) {
      case 'g':
      case 'svg':
        _.each( DFS( c ), function ( el ) {
          list.push( el );
        } );
        break;
      case 'line':
        //console.log( '--- line: ', c );
        list.push( new LINE( c ) );
        break;
      case 'path':
        //console.log( '--- path: ', c );
        list.push( new PATH( c ) );
        break;
      case 'ellipse':
        //console.log( '--- ellipse: ', c );
        list.push( new ELLIPSE( c ) );
        break;
      default:
        break;
    }
  } );
  return list;
}

/**
 * Draw image in Rapid Code.
 *
 * @param drawInst {DrawInst}
 * @param papel {{width: number, height: number}}
 * @constructor
 */
function DRAW( drawInst, papel ) {
  preOUT.clear();
  SCALE.setRatio( drawInst.width, drawInst.height, papel.width, papel.height );
  ABB.header();
  _.each( drawInst.instructions, function ( elem ) {
    //console.log( elem );
    elem.draw();
  } );
  ABB.footer();
}
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