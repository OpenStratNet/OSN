RssFeed.publish( 'updates', function() {
  var feed = this;
  feed.setValue( 'title', feed.cdata( 'Open Strategy Network\'s News Feed' ) );
  feed.setValue( 'description', feed.cdata( 'Latest News, Events and Publications by the Open Strategy Network.' ) );
  feed.setValue( 'link', 'http://openstrategynetwork.com' );
  feed.setValue( 'lastBuildDate', moment().format('ddd, DD MMM YYYY hh:mm:ss') );
  feed.setValue( 'pubDate', moment().format('ddd, DD MMM YYYY hh:mm:ss') );
  feed.setValue( 'ttl', 1 );

  var posts = NewsEvents.find();

  posts.forEach( function( post ) {
    feed.addItem({
      title: post.title,
      description: post.description,
      link: `http://openstrategynetwork.com/news-and-events/${ post._id }`,
      pubDate: post.publishedAt
    });
  });
});