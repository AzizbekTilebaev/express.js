const dbErrorHelper = (error) => {
    const errorCodes = {
        'ER_NO_SUCH_TABLE': "Xatolik: Bunday jadval bazada mavjud emas.",
        'ER_BAD_FIELD_ERROR': "Xatolik: Jadvalda bunday ustun (column) topilmadi.",
        'ER_PARSE_ERROR': "Xatolik: SQL so'rovida sintaktik xato bor.",
        'ER_DUP_ENTRY': "Xatolik: Bunday ma'lumot allaqachon mavjud (Unique constraint).",
        'ER_ROW_IS_REFERENCED_2': "Xatolik: Bu ma'lumotni o'chirib bo'lmaydi, chunki boshqa jadvallar unga bog'langan.",
        'ER_NO_REFERENCED_ROW_2': "Xatolik: Bog'lanayotgan ma'lumot (Foreign Key) bazada mavjud emas.",
        'ECONNREFUSED': "Xatolik: Ma'lumotlar bazasiga ulanib bo'lmadi."
    };

    // Agar xato kodi bizning ro'yxatda bo'lsa, o'shani qaytaramiz
    // Aks holda umumiy xabarni qaytaramiz
    return errorCodes[error.code] || `Kutilmagan baza xatosi: ${error.message}`;
};

module.exports = dbErrorHelper;
