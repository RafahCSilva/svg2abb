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

