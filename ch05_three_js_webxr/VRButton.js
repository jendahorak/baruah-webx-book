
// const VRButton = {
//     createButton: function (gl, options) {
//         if (options && options.referenceSpaceType) {
//             gl.xr.setReferenceSpaceType(options.referenceSpaceType)
//         }

//         function EnterVR() {
//             button.innerHTML = 'Enter VR'
//             let currentSession = null;
//             function onSessionStarted(session) {
//                 session.addEventListener('end', onSessionEnded)
//                 gl.xr.setSession(session)

//                 button.textContent = 'ExitVR'
//                 currentSession = session


//             }
        
//             function onSessionEnded(/*event*/) {
//                 currentSession.removeEventListener('end', onSessionEnded);
//                 button.textContent = 'ExnterVR'
//                 currentSession = null
        
//             }
        
        
//             function setupWebGLLayer() {
        
//             }
        
        
        
//             button.onclick = () => {
//                 if (currentSession === null) {
//                     let sessionInit = {
//                         optionalFeatures: ["local-floor", "bounded-floor"]
//                     };
//                 navigator.xr
//                             .requestSession('immersive-vr', sessionInit)
//                             .then(onSessionStarted);
//                 }
//                 else {
//                     currentSession.end();
//                 }
//             }
//         }    

                
//         function NotFound(){
//             console.log('immersive-vr mode not found')
//         }

//         if (navigator.xr) {
//             var button = document.createElement("button");
//             navigator.xr.isSessionSupported('immersive-vr')
//                     .then((suported) => {
//                         if (suported) { EnterVR() 
//                             button.classList.add("vr-button")} 
//                         else { NotFound() }
//                     })
//             button.setAttribute('id', 'btn')
//             return button
//         } else {
//             if (window.isSecureContext === false) {
//                 console.log('WebXR needs HTTPS');
//             } else {
//                 console.log('WebXR not available');
//             }
//             return;
//         }
//     }
// }



// export {VRButton};

function perpareVR(button){
    // create async button for user to choose to go into VR
    button.addEventListener('click', () => {

// DODELAT
        if (!xrSession) {
            // request session from device
            let sessionInit = {optionalFeatures: ["local-floor", "bounded-floor"]};
            navigator.xr.requestSession('immersive-vr', sessionInit)
            // retruns async promise object Sesssion
            .then((session) => {
                session.addEventListener('end', onSessionEnded)
                global.xr.setSession(session);
                button.textContent = "Exit VR"
                currentSession = session
            })
        }

    })
}


function NotFound(){
    

}



function queryXRSesh() {
        // The if statement checks if the browser’s navigator property contains an XR object
    if (navigator.xr){
        
        // check if 'immersive-vr' mode is suported - here we could also check if 'inline' is suported and display differnet buttons
        // is session suported returns bool - supported
        navigator.xr.isSessionSupported('immersive-vr')
        .then(function(isSuported){
            if (isSuported) {
                let vrButton = document.createElement('button')
                vrButton.textContent = "Enter VR";
                vrButton.disabled = false;
                perpareVR(vrButton)
            } else {
                // the browser supports immersive-vr sesh however the device does not 
                console.log('immersive-vr mode not found');
            }
        })

        
    } else {
        if(window.isSecureContext() === false) {
            console.log('WebXR needs HTTPS')
        } else {
            console.log('WebXR not available')
            // keep the three scene as a Desktop VR
        }
    }



}



















