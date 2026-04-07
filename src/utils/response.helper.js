class response {
    success(res, msg, data) {
        return res.status(200).json({
            status: "Success",
            message: msg || "Success",
            result: data,
        })
    };
    created(res, msg, data) {
        return res.status(201).json({
            status: "success",
            message: msg || "Jaratildi",
            result: data,
        })
    }
    internalServerError(res, msg, data) {
        return res.status(500).json({
            status: 500,
            mesaage: msg || "Serverde qatelik",
            result: data
        })
    }
    unauthorized(res, msg, data) {
        return res.status(400).json({
            status: 400,
            message: msg || "Avtorizatsiyadan otin",
            result: data
        })
    }

    updateUser(res, msg, data) {
        return res.status(200).json({
            status: 200,
            message: msg || "janalandi",
            result: data,
        })
    }

deleteUser(res, msg, data) {
    let statusCode = 200;     // Default status 200 (hammasi yaxshi bo'lsa)
    if (msg === "qatelik") {statusCode = 400; }  // Agar xabar "qatelik" bo'lsa, statusni 400 ga o'zgartiramiz
    return res.status(statusCode).json({
        status: statusCode,
        message: msg || "oshirildi",
        result: data || null,
    });
}

    badRequest(res, msg, data) {
        return res.status(400).json({
            status: 400,
            message: msg || "Jaman juwap",
            result: data
        })

    }

}

module.exports = new response();