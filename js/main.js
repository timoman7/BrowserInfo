(function() {
    let myDatabase = firebase.database();
    let test = myDatabase.ref("test");
    function readableObject(object) {
        let str = "";
        for(let key in object) {
            let value = object[key];
            str += `${key} : ${value}\n`;
        }
        let splitStr = str.split("");
        splitStr.pop();
        return splitStr.join("");
    }
    function matchType(element, types) {
        let isType = false;
        for(let i = 0; i < types.length; i++) {
            let type = types[i];
            isType = typeof(element) == type;
            if(isType) {
                return isType;
            }
        }
        return isType;
    }
    function scrapeObject(object, types) {
        let finishedObject = {};
        for(let key in object) {
            let value = object[key];
            if(matchType(value, types)) {
                finishedObject[key] = value;
            }
        }
        return finishedObject;
    }
    function uploadInfo(info) {
        test.set(info);
    }
    window.addEventListener("load", function() {
        let Accept = document.querySelector("#acceptButton");
        let Butt = document.querySelector("#mainButton");
        Accept.addEventListener("click", function() {
            if(prompt(`This will log your navigator info from your browser, this is what it currently looks like\n${readableObject(scrapeObject(navigator, ["string", "number"]))}\nType "yes" to accept.`).toLowerCase() == "yes") {
                Accept.classList.remove("visible");
                Accept.classList.add("hidden");
                Butt.classList.remove("hidden");
                Butt.classList.add("visible");
            }
        });
        Butt.addEventListener("click", function() {
            let navInfo = scrapeObject(navigator, ["string", "number"]);
            uploadInfo(navInfo);
        });
    });
})();