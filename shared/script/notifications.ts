



namespace PH {



    export class Notification {


        private notification: any;
        private tag:string;



        constructor(public work: string,text: string) {


            this.tag = 'tag'+Math.random();


            // Let's check if the browser supports notifications
            if (!("Notification" in window)) {
                console.warn("This browser does not support desktop notification");
            }

            // Let's check whether notification permissions have already been granted
            else if (window.Notification.permission === "granted") {
                // If it's okay let's create a notification
                this.create(text);
            }

            // Otherwise, we need to ask the user for permission
            else if (window.Notification.permission !== 'denied') {
                window.Notification.requestPermission(function (permission) {
                    // If the user accepts, let's create a notification
                    if (permission === "granted") {
                        this.create(text);
                    }
                });
            }

            // At last, if the user has denied notifications, and you
            // want to be respectful there is no need to bother them any more.
        }



        private create(text: string){

            console.log(this.work+': '+text);
            this.notification =  new window.Notification(this.work+': '+text, {tag: this.tag});

        }



        update(text: string){

            this.notification.close();
            this.create(text);

        }




    }



}