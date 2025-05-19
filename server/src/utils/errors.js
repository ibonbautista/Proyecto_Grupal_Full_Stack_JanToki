/**
 * Review
 */

class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}


class StandNameNotProvided extends Error{
    constructor(){
        super("Stand name not provided");
        this.statusCode = 400;
    }
}

class IncorrectStandSize extends Error {
    constructor(){
        super("Stand size must be 'small', 'medium' or 'large'");
        this.statusCode = 400;
    }
}
class StandCategoryNotProvided extends Error{
    constructor(){
        super("stand_category_id not provided");
        this.statusCode = 400;
    }
}
class StandCategoryNotFound extends Error {
    constructor(){
        super("The stand category provided does not exist");
        this.statusCode = 400;
    }
}
class StandNotFound extends Error {
    constructor(){
        super("Stand not found");
        this.statusCode = 404;
    }
}
/**
 * Favorite
 */
class ProductNameNotProvided extends Error{
    constructor(){
        super("Product name not provided");
        this.statusCode = 400;
    }
}
class ProductPriceNotProvided extends Error{
    constructor(){
        super("Product price not provided");
        this.statusCode = 400;
    }
}
class ProductPriceNotValid extends Error{
    constructor(){
        super("Product price must be a number");
        this.statusCode = 400;
    }
}
class ProductStockNotProvided extends Error{
    constructor(){
        super("Product stock not provided");
        this.statusCode = 400;
    }
}
class ProductStockNotValid extends Error{
    constructor(){
        super("Product stock must be a number");
        this.statusCode = 400;
    }
}
class ProductNotFound extends Error{
    constructor(){
        super("Product not found");
        this.statusCode = 404;
    }
}
/**
 *  authController
 */

class EmailNotFound extends Error{
    constructor(){
        super("User email does not exist");
        this.statusCode = 400;
    }
}
class IncorrectPassword extends Error{
    constructor(){
        super("Incorrect password");
        this.statusCode = 400;
    }
}
/**
 *  userController
 */
class UserNameNotProvided extends Error {
    constructor(){
        super("User name not provided");
        this.statusCode = 400;
    }
}

class UserEmailNotProvided extends Error {
    constructor(){
        super("User email not provided");
        this.statusCode = 400;
    }
}
class UserPasswordNotProvided extends Error {
    constructor(){
        super("User password not provided");
        this.statusCode = 400;
    }
}

class UserRoleNotProvided extends Error {
    constructor(){
        super("User role not provided");
        this.statusCode = 400;
    }
}

class UserRoleIncorrect extends Error {
    constructor(){
        super("User role is not correct, it must be 'client' or 'admin'");
        this.statusCode = 400;
    }
}
class UserEmailAlreadyExists extends Error{
    constructor(){
        super("User email already exists");
        this.statusCode = 400;
    }
}
class UsernameAlreadyExists extends Error{
    constructor(){
        super("Username already exists");
        this.statusCode = 400;
    }
}
class NoUsersFound extends Error {
  constructor() {
    super("No users found");
    this.statusCode = 404;
  }
}

class UserInvalidCredentials extends Error {
    constructor(){
        super("Invalid credentials");
        this.statusCode = 401;
    }
}
class InvalidUserId extends Error {
  constructor() {
    super("Invalid ID User");
    this.name = "InvalidUserId";
    this.statusCode = 400;
  }
}

class UserNotFound extends Error {
  constructor() {
    super("User not found");
    this.name = "UserNotFound";
    this.statusCode = 404;
  }
}

//Paginate
class InvalidPaginationParams extends Error {
  constructor() {
    super("Invalid pagination parameters. Page and limit must be positive numbers.");
    this.statusCode = 400;
  }
}

export {
    StandNameNotProvided,
    IncorrectStandSize,
    StandCategoryNotProvided,
    StandCategoryNotFound,
    StandNotFound,
    ProductNameNotProvided,
    ProductPriceNotProvided,
    ProductPriceNotValid,
    ProductStockNotProvided,
    ProductStockNotValid,
    ProductNotFound,
    EmailNotFound,
    IncorrectPassword,
    UserNameNotProvided,
    UserEmailNotProvided,
    UserPasswordNotProvided,
    UserRoleNotProvided,
    UserRoleIncorrect,
    UserEmailAlreadyExists,
    UsernameAlreadyExists,
    UserInvalidCredentials,
    NoUsersFound,
    InvalidUserId,
    UserNotFound,
    InvalidPaginationParams
}