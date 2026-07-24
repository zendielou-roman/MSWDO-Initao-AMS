<?php

use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\ApplicationController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{user}', [UserController::class, 'update']);
Route::delete('/users/{user}', [UserController::class, 'destroy']);

Route::get('/programs', [ProgramController::class, 'index']);
Route::post('/programs', [ProgramController::class, 'store']);
Route::put('/programs/{program}', [ProgramController::class, 'update']);
Route::delete('/programs/{program}', [ProgramController::class, 'destroy']);

Route::get('/clients', [ClientController::class, 'index']);
Route::post('/clients', [ClientController::class, 'store']);
Route::put('/clients/{client}', [ClientController::class, 'update']);
Route::delete('/clients/{client}', [ClientController::class, 'destroy']);

Route::get('/applications', [ApplicationController::class, 'index']);
Route::post('/applications', [ApplicationController::class, 'store']);
Route::put('/applications/{application}', [ApplicationController::class, 'update']);
Route::delete('/applications/{application}', [ApplicationController::class, 'destroy']);