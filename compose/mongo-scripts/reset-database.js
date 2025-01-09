const gabix = db.getSiblingDB("gabix");
const collectionNames = gabix.getCollectionNames();
collectionNames.forEach((collectionName) => {
  print(collectionName);
  print(gabix.getCollection(collectionName).deleteMany({}));
});
