const utilities = {
    parseHTML (str) {
        let tmp = document.implementation.createHTMLDocument();
        tmp.body.innerHTML = str;
        return tmp.body.children[0];
    },
    getCookie (cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    },
    isMobile() {
        return window.innerWidth <= 568;
    }
};

let app = {
    init: () => {
        console.log('Hello World 3rd party JS SDK');
    }
};

app.init();
