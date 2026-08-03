<?php

use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\ReliefOperationController;
use App\Http\Controllers\Api\DonationController;
use App\Http\Controllers\Api\SocialPensionBeneficiaryController;
use App\Http\Controllers\Api\SlpBeneficiaryController;
use App\Http\Controllers\Api\NotificationController;

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

Route::get('/relief-operations', [ReliefOperationController::class, 'index']);
Route::post('/relief-operations', [ReliefOperationController::class, 'store']);
Route::put('/relief-operations/{reliefOperation}', [ReliefOperationController::class, 'update']);

Route::get('/donations', [DonationController::class, 'index']);
Route::post('/donations', [DonationController::class, 'store']);
Route::put('/donations/{donation}', [DonationController::class, 'update']);

Route::get('/social-pension-beneficiaries', [SocialPensionBeneficiaryController::class, 'index']);
Route::post('/social-pension-beneficiaries', [SocialPensionBeneficiaryController::class, 'store']);
Route::put('/social-pension-beneficiaries/{socialPensionBeneficiary}', [SocialPensionBeneficiaryController::class, 'update']);

Route::get('/slp-beneficiaries', [SlpBeneficiaryController::class, 'index']);
Route::post('/slp-beneficiaries', [SlpBeneficiaryController::class, 'store']);
Route::put('/slp-beneficiaries/{slpBeneficiary}', [SlpBeneficiaryController::class, 'update']);

Route::get('/notifications', [NotificationController::class, 'index']);
Route::put('/notifications/{notification}', [NotificationController::class, 'update']);
Route::post('/notifications/mark-all-read', [NotificationController::class, 'markAllRead']);