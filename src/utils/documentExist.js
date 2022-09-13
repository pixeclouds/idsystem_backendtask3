async function chechIfDocumentExist(Model, query){
    let document =  await Model.findOne({...query });
    if (!document || !document._id){
        throw new Error("Document not found");
    };
    return true;
};

module.exports = chechIfDocumentExist;