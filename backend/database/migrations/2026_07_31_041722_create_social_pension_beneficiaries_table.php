<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('social_pension_beneficiaries', function (Blueprint $table) {
            $table->id();
            $table->string('pension_code')->unique();
            $table->string('name');
            $table->unsignedInteger('age');
            $table->string('barangay');
            $table->string('osca_id');
            $table->string('source');
            $table->date('date_registered');
            $table->date('last_payout')->nullable();
            $table->string('status')->default('Active');
            $table->string('registered_by')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('social_pension_beneficiaries');
    }
};