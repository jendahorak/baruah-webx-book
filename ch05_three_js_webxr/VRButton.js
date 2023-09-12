const VRButton = {
    createButton: function (gl, options) {
        if (options && options.referenceSpaceType) {
            gl.xr.setReferenceSpaceType(options.referenceSpaceType)
        }


        function buildButton(){
            let enterVRButton = document.createElement('button')
            enterVRButton.textContent = "Enter VR";
            enterVRButton.setAttribute("id", "btn");
            return enterVRButton
        }

        function perpareVR(button){
            let currentSession = null;
            function onSessionStarted(session){
                // callback to end session
                session.addEventListener('end', onSessionEnded)

                // mutate button content
                button.textContent = 'Exit XR'
                // set current session - WHY?
                currentSession = session

                setupWebGLLayer()
                    .then(() => {
                       gl.xr.setSession(currentSession)     
                    })

            }

            function onSessionEnded(){
                currentSession.removeEventListener('end', onSessionEnded)
                button.textContent('Enter VR')
                currentSession = null
            }


            function setupWebGLLayer() {
                var glContext = gl.getContext();
                return glContext.makeXRCompatible().then(() => {
                    currentSession.updateRenderState( {baseLayer: new XRWebGLLayer(currentSession, glContext) });
                });
            }


            button.addEventListener('click', () => {
                if (currentSession === null) {
                    let sessionInit = { optionalFeatures: ["local-floor"]}
                    navigator.xr
                        .requestSession('immersive-vr', sessionInit)
                        .then(onSessionStarted)
                } else {
                    currentSession.end()
                }

            })  

        }


        function vrNotFound(){
            console.log('immersive-vr mode not found')
        }

        
        // The if statement checks if the browser’s navigator property contains an XR object
        if (navigator.xr){
            var button = buildButton()
            // check if 'immersive-vr' mode is suported - here we could also check if 'inline' is suported and display differnet buttons
            // is session suported returns bool - supported
            navigator.xr.isSessionSupported('immersive-vr')
                        .then(function(isSuported){
                            if (isSuported) {
                                perpareVR(button)
                            } else {
                                // the browser supports immersive-vr sesh however the device does not 
                                vrNotFound();
                            }
                        })
            return button
        } else {
            if(window.isSecureContext() === false) {
                console.log('WebXR needs HTTPS')
            } else {
                console.log('WebXR not available')
                // keep the three scene as a Desktop VR
            }
            return;
        }

        return VRButton

    }
}

export {VRButton}

