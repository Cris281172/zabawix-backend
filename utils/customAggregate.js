const customAggregate = async (collection, stages) => {
    return await collection.aggregate(stages).exec()
}

module.exports = customAggregate