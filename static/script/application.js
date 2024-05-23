import { User } from "./models/user.js";

export class Application {
    user = null;
    dialogBoolean = false;

    dialogLogin = document.getElementById("login-dialog");
    dialogLogout = document.getElementById("logout-dialog");
    dialogRegister = document.getElementById("register-dialog");

    constructor() {
        document.addEventListener("DOMContentLoaded", () => {
            this.init();
        });
        console.log("Application created");
    }

    init() {
        this.updateHTML();
        document.querySelector("#main-header .login").addEventListener("click", (event) => {
            event.preventDefault();
            // this.login("admin", "admin");\
            this.show(this.dialogLogin);
        });

        document.querySelector("#main-header .logout").addEventListener("click", (event) => {
            event.preventDefault();
            this.show(this.dialogLogout);
        });

        document.querySelector("#main-header .register").addEventListener("click", (event) => {
            event.preventDefault();
            this.show(this.dialogRegister);
        });

        document.querySelector("#login-submit").addEventListener("click", (event) => {
            event.preventDefault();
            const username = document.querySelector("#login-username").value;
            const password = document.querySelector("#login-password").value;
            this.login(username, password);
            document.querySelector("#login-dialog").close();
        });

        document.querySelector("#logout-submit").addEventListener("click", (event) => {
            event.preventDefault();
            this.logout();
            document.querySelector("#logout-dialog").close();
        });

        document.querySelector("#register-submit").addEventListener("click", (event) => {
            event.preventDefault();
            const username = document.querySelector("#register-username").value;
            const email = document.querySelector("#register-email").value;
            const password = document.querySelector("#register-password").value;

            this.register(username, email, password);
            document.querySelector("#register-dialog").close();
        });

        console.log("Application intialized");
    }

    updateHTML() {
        if(this.user) {
            // Update links when user is logged in
            document.querySelector("#main-header .login").style.display = "none";
            document.querySelector("#main-header .logout").style.display = "inline";
            document.querySelector("#main-header .register").style.display = "none";
            document.querySelector("#main-header .profile").style.display = "inline";
        } else {
            // Update links when user is not logged in
            document.querySelector("#main-header .login").style.display = "inline";
            document.querySelector("#main-header .logout").style.display = "none";
            document.querySelector("#main-header .register").style.display =
                "inline";
            document.querySelector("#main-header .profile").style.display = "none";

        }
    }

    async register(username, email, password)
    {
        const user = await User.register(username, email, password);
        if(!user)
            {
                alert("Registreren faal!");
                return; 
            }
        this.user = user;
        this.updateHTML();
    }

    async login(username, password) {
        const user = await User.login(username, password);
        if(!user)
        {
            alert("Login faal!");
            return;
        }
        this.user = user;

        // console.log(this.user);

        this.updateHTML();
    }

    logout() {
        this.user = null;
        this.updateHTML();
    }

    show(dialog)
    {
        if(this.dialogBoolean)
        {
            dialog.close();
            this.dialogBoolean = false;
        }
        else
        {
            dialog.showModal();
            this.dialogBoolean = true;
        }
    }
}