
if (navigator.xr) {
    let button = document.createElement("button");
    navigator.xr.isSessionSupported('immersive-vr')
            .then((suported) => {
             if (suported) { EnterVR() } 
             else { NotFound() }
            })
} else {
    if (window.isSecureContext === false) {
        console.log('WebXR needs HTTPS');
    } else {
        console.log('WebXR not available');
    }
    return;
}




function EnterVR() {
    button.innerHTML = 'Enter VR'
    let currentSession = null;
    function onSessionStarted(session) {
    }

    button.onlick = () => {

        let sessionInit = {
            optionalFeatures: ['local-floor', 'bounded-floor']
        }


        navigator.xr
            .requestSession('immersive-vr', sessionInit)
            .then(onSessionStarted)

    }

}



function NotFound(){
    console.log('immersive-vr mode not found')
}

