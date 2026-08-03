<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('slp_beneficiaries', function (Blueprint $table) {
            $table->id();
            $table->string('beneficiary_code')->unique();
            $table->string('name');
            $table->string('barangay');
            $table->string('track');
            $table->string('project');
            $table->unsignedInteger('capital')->default(0);
            $table->date('date_enrolled');
            $table->string('status')->default('Active');
            $table->string('enrolled_by')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('slp_beneficiaries');
    }
};