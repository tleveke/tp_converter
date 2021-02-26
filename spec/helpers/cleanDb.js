const cleanDb = async (db) => {
    await db.Company.destroy({ truncate: { cascade: true } });
    await db.Booking.destroy({ truncate: { cascade: true } });
    await db.Account.destroy({ truncate: { cascade: true } });
}
module.exports = cleanDb