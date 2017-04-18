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
