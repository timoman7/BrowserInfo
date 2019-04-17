(function() {
    let myAuth = firebase.auth();
    let currentUser;
    function login() {
        let provider = new firebase.auth.GoogleAuthProvider();
        myAuth.signInWithRedirect(provider);
        myAuth.getRedirectResult().then(function(result) {
            let user = result.user;
            if(user===null){
                let provider = new firebase.auth.GoogleAuthProvider();
                myAuth.signInWithRedirect(provider);
            }else{
                currentUser = myAuth.currentUser;
            }
        }, function(error) {
            var email = error.email;
            var credential = error.credential;
        });
    }
    function logout() {
        myAuth.signOut();
    }
    window.addEventListener("load", function() {
        let LogIn = document.querySelector("#loginButton");
        let LogOut = document.querySelector("#logoutButton");
        LogIn.addEventListener("click", login);
        LogOut.addEventListener("click", logout);
        setInterval(function() {
            currentUser = myAuth.currentUser;
            if(currentUser != null) {
                LogIn.classList.remove("visible");
                LogIn.classList.add("hidden");
                LogOut.classList.remove("hidden");
                LogOut.classList.add("visible");
            }
        }, 400)
    });
})();