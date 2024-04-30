const createSortQuery = (sort) => ({$sort: sort});
const createSkipQuery = (skip) => ({$skip: skip});
const createMatchQuery = (filters) => ({$match: filters});
const createLimitQuery = (limit) => ({$limit: limit});
const createAddFieldsQuery = (addFields) => ({$addFields: addFields});
const createLookupQuery = ({from, localField, foreignField, as, let: letVariables, pipeline}) => {
    if (letVariables && pipeline) {
        return {
            $lookup: {
                from,
                let: letVariables,
                pipeline,
                as
            }
        };
    }
    else {
        return {
            $lookup: {
                from,
                localField,
                foreignField,
                as
            }
        };
    }
};

const createReplaceRootQuery = (newRoot) => ({$replaceRoot: {newRoot}});

const createGroupQuery = (group) => ({$group: group});
const createProjectQuery = (project) => {
    const projectObject = {};

    if (project.customFields) {
        for (const prop in project.customFields) {
            projectObject[prop] = project.customFields[prop];
        }
    }

    if (Array.isArray(project.fields)) {
        project.fields.forEach(field => projectObject[field] = 1);
    }

    return {
        $project: projectObject
    };
}


const createUnwindQuery = (unwind) => {
    if (Array.isArray(unwind)) {
        return unwind.map(field => ({ $unwind: field }));
    }
    return [{ $unwind: unwind }];
};

const createLookupsArray = (lookups) => lookups.map(lookup => createLookupQuery(lookup));

const getDataByProp = (query, prop) => {
    const queryPropFunctions = {
        sort: createSortQuery,
        addFields: createAddFieldsQuery,
        skip: createSkipQuery,
        match: createMatchQuery,
        limit: createLimitQuery,
        lookups: createLookupsArray,
        project: createProjectQuery,
        unwind: createUnwindQuery,
        group: createGroupQuery,
        replaceRoot: createReplaceRootQuery
    }

    return queryPropFunctions[prop](query[prop]);
}

const customAggregate = async (collection, query) => {
    let queryArray = [];

    for(const prop in query){
        queryArray = Array.isArray(getDataByProp(query, prop)) ? [...queryArray, ...getDataByProp(query, prop)] : [...queryArray, getDataByProp(query, prop)]
    }


    return await collection.aggregate(queryArray).exec()
}



module.exports = customAggregate
