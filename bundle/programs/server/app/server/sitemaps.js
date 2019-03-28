(function(){sitemaps.add('/sitemap.xml', function() {
  return [
   {
    // Required.  http[s]://sitename.com automatically prepended */
    page: '/',
    // Optional.  Timestamp of when the page was last modified.
    lastmod: new Date(),         // or new Date().getTime()
    // Optional.  always, hourly, daily, weekly, monthly, yearly, never
    // http://www.sitemaps.org/protocol.html#changefreqdef
    changefreq: 'weekly',
    // Optional.  http://www.sitemaps.org/protocol.html#prioritydef
    priority: 0.5,
    // Optional.  https://support.google.com/webmasters/answer/2620865
    // Again, the base URL is automatically prepended to the href key

    // /!!!\ Ian: We should come back to this if we translate the home page

    // xHtmlLinks: [
    //   { ref: 'alternate', 'hreflang': 'en', 'href': 'en/blah' },
    //   { ref: 'alternate', 'hreflang': 'de', 'href': 'de/blah' }
    // ],
    // Optional.  https://support.google.com/webmasters/answer/2620865?hl=en
    // Again, the base URL is automatically prepended to the loc key
    images: [
      { 
        loc: '/landing/logo-journey.png',
        caption: "Journey 2 English Logo",
        title: "Journey 2 English Logo", 
      },      
      { 
        loc: 'landing/logo-klik2learn.png',
        caption: "Klik2learn Logo",
        title: "Klik2learn Logo", 
      }
      // ,{ 
      //   loc: '/myOtherImg.jpg',   
      //   // Below properties are optional
      //   caption: "..", 
      //   geo_location: "..", 
      //   title: "..", 
      //   license: ".."
      // }
    ],
    // Optional.  https://support.google.com/webmasters/answer/80472?hl=en
    // Again, the base URL is automatically prepended to loc, *_loc
    videos: [
      { 
        content_loc: '/video/course.mp4',
        thumbnail_loc: "/video/course.jpg", 
        title: "Why choose Journey 2 English", 
        description: "Why choose Journey 2 English", 
      }, 
      { 
        content_loc: '/video/testimonials.mp4',
        thumbnail_loc: "/video/testimonials.jpg", 
        title: "Journey 2 English Testimonials", 
        description: "What people say about Journey 2 English", 
      }
      // ,{ 
      //   loc: '/myOtherVideo.jpg',  // Below properties are optional
      //   thumbnail_loc: "..", 
      //   title: "..", 
      //   description: "..", 
      //   etc: ".." 
      // }
    ]
  }
  ];
});
}).call(this);
