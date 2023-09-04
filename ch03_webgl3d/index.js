function main() {
  /*========== Create a WebGL Context ==========*/
  const canvas = document.querySelector('#c');
  const gl = canvas.getContext('webgl');
  function checkContext(gl) {
    if (!gl) {
      console.log('WebGL not suported');
    } else {
      console.log('WebGL ready');
    }
  }

  checkContext(gl);

  /*========== Define and Store the Geometry ==========*/
  /*====== Define front-face vertices ======*/
  /*====== Define front-face buffer ======*/
  /*========== Shaders ==========*/
  /*====== Define shader source ======*/
  /*====== Create shaders ======*/
  /*====== Compile shaders ======*/
  /*====== Create shader program ======*/
  /*====== Link shader program ======*/
  /*====== Connect the attribute with the vertex shader =======*/
  /*========== Drawing ========== */
  /*====== Draw the points to the screen ======*/
}

main();
