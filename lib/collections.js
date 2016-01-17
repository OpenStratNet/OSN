Publications = new Mongo.Collection("publications");

NewsEvents = new Mongo.Collection("newsevents");

PublicationsIndex = new EasySearch.Index({
  collection: Publications,
  fields: ['authors.firstName', 'authors.lastName', 'title', 'outlet', 'year', 'abstract'],
  engine: new EasySearch.Minimongo(),
});
