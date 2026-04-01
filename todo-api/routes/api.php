<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TodoController;


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::get('/test', function () {
    return response()->json([
        'message' => 'API working'
    ]);
});



Route::prefix('todos')->group(function () {
    Route::get('/', [TodoController::class, 'index']);
    Route::post('/', [TodoController::class, 'store']);
    Route::put('/{id}', [TodoController::class, 'update']);
    Route::delete('/completed', [TodoController::class, 'clearCompleted']);

    Route::delete('/{id}', [TodoController::class, 'destroy']);

    Route::patch('/{id}/toggle', [TodoController::class, 'toggle']);
    Route::post('/reorder', [TodoController::class, 'reorder']);
});




