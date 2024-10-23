export class ApiError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
    }
  
    static badRequest(message) {
      return new ApiError(400, message || 'Incorrect request');
    }
  
    static forbidden(message) {
      return new ApiError(403, message || 'Access denied');
    }
  
    static internal(message) {
      return new ApiError(500, message || 'Internal server error');
    }
}
  