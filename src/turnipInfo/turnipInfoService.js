const TurnipService = {
    getAllTurnipInfo(db) {
        return db.select('*').from('turnip_prices');
    },
    addNewTurnipInfo(db, item) {
        return db.insert(item).into('turnip_prices').returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteTurnipInfo(db, id) {
        return db('turnip_prices')
        .select('*')
        .where('id', id)
        .delete()
    }
}

module.exports = TurnipService