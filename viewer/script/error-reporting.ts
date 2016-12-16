/// <reference path="reference.ts" />

if(!GALLERY.Viewer.develop) {
    Raven.config('https://71d6fb2b651845dea3ef3861e8df529d@sentry.io/122195').install({

        environment: (GALLERY.Viewer.develop ? 'develop' : 'production'),
        //serverName: GALLERY.Viewer.analyticsObject.domain
    });


}