// Base Controller
export class Controller {
    json(data, status = 200, headers = {}) {
        return Response.json(data, { status, headers });
    }
    
    error(message, status = 400) {
        return Response.json({ error: message, success: false }, { status });
    }

    success(message = "Success", data = null, status = 200) {
        return Response.json({ message, data, success: true }, { status });
    }
}

export default Controller;
