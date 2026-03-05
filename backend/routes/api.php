<?php

use App\Http\Controllers\PhotoController;
use Illuminate\Support\Facades\Route;

Route::post('/photos', [PhotoController::class, 'store']);
Route::get('/photos', [PhotoController::class, 'index']);
Route::get('/photos/selected', [PhotoController::class, 'selected']);
Route::put('/photos/{id}', [PhotoController::class, 'update']);
Route::delete('/photos/{id}', [PhotoController::class, 'destroy']);
Route::delete('/photos', [PhotoController::class, 'clear']);
