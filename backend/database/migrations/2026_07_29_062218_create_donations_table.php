<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->string('donation_code')->unique();
            $table->string('donor');
            $table->string('type');
            $table->unsignedInteger('value')->nullable();
            $table->date('date_received');
            $table->string('allocated_to')->nullable();
            $table->string('status')->default('Pending');
            $table->string('recorded_by')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};