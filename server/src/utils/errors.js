/**
 * Restaurant
 */
class RestaurantNotFound extends Error {
  constructor(message = "Restaurante no encontrado") {
    super(message);
    this.name = "RestaurantNotFound";
    this.statusCode = 404;
  }
}

class InvalidRestaurantId extends Error {
  constructor() {
    super("ID de restaurante no válido");
    this.name = "InvalidRestaurantId";
    this.statusCode = 400;
  }
}
class InvalidRestaurantData extends Error {
  constructor(message = "Datos inválidos para crear un restaurante") {
    super(message);
    this.name = "InvalidRestaurantData";
    this.statusCode = 400;
  }
}

class RestaurantAlreadyExists extends Error {
  constructor() {
    super("Ya existe un restaurante con ese nombre en esa ubicación");
    this.name = "RestaurantAlreadyExists";
    this.statusCode = 409;
  }
}
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;

    // Aseguramos que el mensaje esté presente
    if (!message) {
      this.message = "Error de validación";
    }
  }
}


/**
 * Favorite
 */
class NoFavoritesFound extends Error {
  constructor() {
    super("No favorites yet");
    this.name = "NoFavoritesFound";
    this.statusCode = 404;
  }
}
class RestaurantIdNotProvided extends Error {
  constructor() {
    super("ID restaurant is not provided");
    this.name = "RestaurantIdNotProvided";
    this.statusCode = 400;
  }
}

class FavoriteAlreadyExists extends Error {
  constructor() {
    super("The restaurant is already in favorites");
    this.name = "FavoriteAlreadyExists";
    this.statusCode = 400;
  }
}
class FavoriteNotFound extends Error {
  constructor() {
    super("Favorite not found");
    this.statusCode = 404;
  }
}

class NotAuthorizedToDeleteFavorite extends Error {
  constructor() {
    super("Not authorized to delete another user's favorites");
    this.statusCode = 403;
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
    RestaurantNotFound ,
    InvalidRestaurantId,
    InvalidRestaurantData,
    RestaurantAlreadyExists,
    NoFavoritesFound,
    RestaurantIdNotProvided,
    ValidationError,
    FavoriteAlreadyExists,
    FavoriteNotFound,
    NotAuthorizedToDeleteFavorite,
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