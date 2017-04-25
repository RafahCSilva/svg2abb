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
  Wmm: 0,
  Hmm: 0,
  /**
   * Set the calc Ratio to fill image in paper.
   *
   * @param Wpx (image width in pixels)
   * @param Hpx (image height in pixels)
   * @param Wmm (paper width in mm)
   * @param Hmm (paper height in mm)
   */
  setRatio: function ( Wpx, Hpx, Wmm, Hmm ) {
    this.Wmm    = Wmm;
    this.Hmm    = Hmm;
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
    //return Math.round( this.Wmm - this.ratioW * Xpx );
  },
  /**
   * Scale transforme in Y axis.
   *
   * @param Ypx (in pixels)
   * @return number (in mm)
   */
  px2mmY: function ( Ypx ) {
    return Math.round( this.ratioH * Ypx );
    //return Math.round( this.Hmm - this.ratioH * Ypx );
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
    
    preOUT.println( '    MoveL Offs( p10, 0, 0, ' + this.zUP + ' ), ' + this.v + ', ' + this.z + ', ' + this.tool + ';' );
  },
  /**
   * Print Code of program footer.
   */
  footer: function () {
    preOUT.println( '  ENDPROC' );
    preOUT.println( 'ENDMODULE' );
  },
  /**
   * Go at position upper.
   *
   * @param x (in mm)
   * @param y (in mm)
   * @constructor
   */
  GO: function ( x, y ) {
    x = SCALE.px2mmX( x );
    y = SCALE.px2mmY( y );
    preOUT.println( '    MoveL Offs( p10, ' + y + ', ' + x + ', ' + this.zUP + ' ), ' + this.v + ', ' + this.z + ', ' + this.tool + ';' );
  },
  /**
   * Print Code for lower a tool of paper.
   *
   * @param x (in mm)
   * @param y (in mm)
   * @constructor
   */
  DOWN: function ( x, y ) {
    x = SCALE.px2mmX( x );
    y = SCALE.px2mmY( y );
    preOUT.println( '    MoveL Offs( p10, ' + y + ', ' + x + ', ' + 0 + ' ), ' + this.v + ', ' + this.z + ', ' + this.tool + ';' );
  },
  /**
   * Print Code for lift a tool of paper.
   *
   * @param x (in mm)
   * @param y (in mm)
   */
  UP: function ( x, y ) {
    x = SCALE.px2mmX( x );
    y = SCALE.px2mmY( y );
    preOUT.println( '    MoveL Offs( p10, ' + y + ', ' + x + ', ' + this.zUP + ' ), ' + this.v + ', ' + this.z + ', ' + this.tool + ';' );
  },
  /**
   * Print Code for move tool of paper.
   *
   * @param x (in mm)
   * @param y (in mm)
   */
  MOVE: function ( x, y ) {
    x = SCALE.px2mmX( x );
    y = SCALE.px2mmY( y );
    preOUT.println( '    MoveL Offs( p10, ' + y + ', ' + x + ', ' + 0 + ' ), ' + this.v + ', ' + this.z + ', ' + this.tool + ';' );
  },
  
  /**
   * Allow Comments in Rapid Code.
   */
  allowComment: false,
  /**
   * Enable Comments in Rapido Code.
   *
   * @param {boolean} val
   */
  enableComments: function ( val ) {
    this.allowComment = val;
  },
  /**
   * Comment in Rapid Code.
   */
  COMMENT: function () {
    if ( this.allowComment ) {
      var text = '';
      for ( var i = 0; i < arguments.length; i++ ) {
        text += arguments[ i ];
        text += ' ';
      }
      preOUT.println( '    ! ' + text );
    }
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
    var s_x1 = parseFloat( this.x1 );
    var s_y1 = parseFloat( this.y1 );
    var s_x2 = parseFloat( this.x2 );
    var s_y2 = parseFloat( this.y2 );
    ABB.COMMENT( 'line (' + s_x1 + ',' + s_y2 + ')->(' + s_x2 + ',' + s_y2 + ')' );
    
    // go to point and down
    ABB.GO( s_x1, s_y1 );
    ABB.DOWN( s_x1, s_y1 );
    // Scribble
    ABB.MOVE( s_x2, s_y2 );
    // up
    ABB.UP( s_x2, s_y2 );
  };
}

/**
 * Element Path.
 * https://www.w3.org/TR/SVG/paths.html
 *
 * @param doc (xml element)
 * @constructor
 */
function PATH( doc ) {
  this.d   = doc.getAttribute( 'd' );
  this.vet = this
    .d
    .replace( /(,)/g, ' ' )
    .replace( /(m)/g, ' m ' )
    .replace( /(M)/g, ' M ' )
    .replace( /(c)/g, ' c ' )
    .replace( /(C)/g, ' C ' )
    .replace( /(l)/g, ' l ' )
    .replace( /(L)/g, ' L ' )
    .replace( /(z)/g, ' z ' )
    .replace( /(Z)/g, ' Z ' )
    .replace( /(\s+)/g, ' ' )
    .trim()
    .split( ' ' );
  
  /**
   * Draw path in Rapid Code.
   */
  this.draw = function () {
    ABB.COMMENT( 'path' );
    cLog( 'path' );
    var i        = 0,
        x0       = 0,
        y0       = 0,
        lastX    = 0,
        lastY    = 0,
        firstObj = true;
    while ( i < this.vet.length ) {
      switch ( this.vet[ i ] ) {
        case 'm': // moveto
          ABB.COMMENT( 'm' );
          x0 = parseFloat( this.vet[ ++i ] );
          y0 = parseFloat( this.vet[ ++i ] );
          i++;
          lastX = x0;
          lastY = y0;
          cLog( 'm', x0, y0 );
          break;
        
        
        case 'l': // lineTo relative
          ABB.COMMENT( 'l' );
          var x = parseFloat( this.vet[ ++i ] ),
              y = parseFloat( this.vet[ ++i ] );
          if ( firstObj ) {
            cLog( 'firstObj', firstObj );
            firstObj = false;
            ABB.GO( x0, y0 );
            ABB.DOWN( x0, y0 );
          }
          lastX += x;
          lastY += y;
          ABB.MOVE( lastX, lastY );
          i++;
          cLog( 'l', lastX, lastY );
          break;
        
        
        case 'c': // curve relative
          var x1 = parseFloat( this.vet[ ++i ] ),
              y1 = parseFloat( this.vet[ ++i ] ),
              x2 = parseFloat( this.vet[ ++i ] ),
              y2 = parseFloat( this.vet[ ++i ] ),
              x3 = parseFloat( this.vet[ ++i ] ),
              y3 = parseFloat( this.vet[ ++i ] );
          ABB.COMMENT( 'c (' + x1 + ' ' + y1 + ') (' + x2 + ' ' + y2 + ') (' + x3 + ' ' + y3 + ')' );
          if ( firstObj ) {
            firstObj = false;
            ABB.GO( x0, y0 );
            ABB.DOWN( x0, y0 );
          }
          // line no lugar da curva
          lastX += x3;
          lastY += y3;
          ABB.MOVE( lastX, lastY );
          i++;
          cLog( 'c', lastX, lastY );
          break;
        
        
        case 'z': // closePath
          ABB.COMMENT( 'z' );
          ABB.MOVE( x0, y0 );
          ABB.UP( x0, y0 );
          i++;
          cLog( 'z', x0, y0 );
          break;
        default:
          cLog( 'default:', this.vet[ i ] );
          i++;
          break
      }
    }
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
    ABB.COMMENT( 'ellipse' );
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
  cLog( '=== PARSE ===' );
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
        cLogElement2( '--- line: ', c );
        list.push( new LINE( c ) );
        break;
      case 'path':
        cLogElement2( '--- path: ', c );
        list.push( new PATH( c ) );
        break;
      case 'ellipse':
        cLogElement2( '--- ellipse: ', c );
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
  cLog( '=== DRAW ===' );
  preOUT.clear();
  SCALE.setRatio( drawInst.width, drawInst.height, papel.width, papel.height );
  ABB.header();
  _.each( drawInst.instructions, function ( elem ) {
    cLogElement( elem );
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