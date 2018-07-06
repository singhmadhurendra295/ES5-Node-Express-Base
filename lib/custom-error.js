class customError extends Error {
    constructor(message, status) {
        // Calling parent constructor of base Error class.
        super(message);
        // Saving class name in the property of our custom error as a shortcut.
        this.name = this.constructor.name;
        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
        // You can use any additional properties you want.
        // I'm going to use preferred HTTP status for this error types.
        // `500` is the default value if not specified.
        this.status = status || 404;
    }
};

// let instance = null ;
// class customError extends Error {

//     constructor(message) {
//         super(message);//"ReferenceError: Must call super constructor in derived class before accessing 'this'
//         // if (instance) {
//         //     throw new Error('customError is a singleton.');
//         // }else{
//         //     instance = this;
//         //     this.message = message;            
//         // }        
//         this.name = this.constructor.name;
//         Error.captureStackTrace(this, this.constructor);        
//     }

//     createInstance(message) {
//         let object = new customError(message);
//         return object;
//     }


//     getInstance(message) {
//         // if (!instance) {
//         //     instance = customError.createInstance(message);
//         // }
//         instance = customError.createInstance(message);
//         return instance;
//     }
// }

module.exports = customError;