
const VRButton = {
    createButton: function (gl, options) {
        if (options && options.referenceSpaceType) {
            gl.xr.setReferenceSpaceType(options.referenceSpaceType)
        }

        function EnterVR() {
            button.innerHTML = 'Enter VR'
            let currentSession = null;
            function onSessionStarted(session) {
                session.addEventListener('end', onSessionEnded)
                gl.xr.setSession(session)

                button.textContent = 'ExitVR'
                currentSession = session


            }
        
            function onSessionEnded(/*event*/) {
                currentSession.removeEventListener('end', onSessionEnded);
                button.textContent = 'ExnterVR'
                currentSession = null
        
            }
        
        
            function setupWebGLLayer() {
        
            }
        
        
        
            button.onclick = () => {
                if (currentSession === null) {
                    let sessionInit = {
                        optionalFeatures: ["local-floor", "bounded-floor"]
                    };
                navigator.xr
                            .requestSession('immersive-vr', sessionInit)
                            .then(onSessionStarted);
                }
                else {
                    currentSession.end();
                }
            }
        }    

                
        function NotFound(){
            console.log('immersive-vr mode not found')
        }

        if (navigator.xr) {
            var button = document.createElement("button");
            navigator.xr.isSessionSupported('immersive-vr')
                    .then((suported) => {
                        if (suported) { EnterVR() 
                            button.classList.add("vr-button")} 
                        else { NotFound() }
                    })
            button.setAttribute('id', 'btn')
            return button
        } else {
            if (window.isSecureContext === false) {
                console.log('WebXR needs HTTPS');
            } else {
                console.log('WebXR not available');
            }
            return;
        }
    }
}



export {VRButton};