<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\GenreController;
use App\Http\Controllers\API\BooksController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/get-books', [BooksController::class, 'getBooksForCustomer']);


Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'register']);
Route::group(['middleware' => ['auth:sanctum']], function () {
    // logout 
    Route::post('/logout', [AuthController::class, 'logout']);

   
    
    //
    Route::get('/genre',  [GenreController::class, 'getGenre']);
    Route::post('/add-update-genre',  [GenreController::class, 'addUpdateGenre']);
    Route::DELETE('/remove-genre/{id}', [GenreController::class, 'removeGenre']);

    //
    Route::get('/books', [BooksController::class, 'getBooks']);
    Route::post('/add-update-book',  [BooksController::class, 'addOrUpdateBooks']);
    Route::DELETE('/remove-book/{id}', [BooksController::class, 'removeBook']);


});
