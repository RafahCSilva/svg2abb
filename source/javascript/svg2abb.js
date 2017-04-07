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