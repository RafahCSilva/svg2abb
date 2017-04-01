var preABB = {
  pre: $( '#preABB' ),
  print: function ( s ) {
    this.pre.append( s );
  },
  println: function ( s ) {
    this.pre.append( s + "\n" );
  },
  limpar: function () {
    this.pre.clear();
  }
};
for ( var i = 0; i < 500; i++ ) {
  preABB.println( 'oiiii' );
}


