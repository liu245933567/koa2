db.cartoon_list.aggregate([
  {
    $match: { collectionTag: 'woshidashenxian' }
  },
  { '$limit': 20 },
  {
    $lookup: {
      from: 'section_list',
      localField: 'collectionTag',
      foreignField: 'collectionTag',
      as: 'sectioList'
    }
  },
  {
    $sort: {
      'sectioList.sectionId': 1
    }
  },
  {
    '$project': {
      '_id': '$$REMOVE',
      'coverImage': 1,
      'cartoonId': 1,
      'description': 1,
      'collectionTag': 1,
      'cartoonName': 1,
      'updataTime': 1,
      'sectioList._id': '$$REMOVE',
      'sectioList.sectionTitle': 1,
      'sectioList.sectionId': 1
    }
  }
]);
