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
  
  // Height away from paper d(25 mm = 2.5 cm).
  zUP: 25,
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

