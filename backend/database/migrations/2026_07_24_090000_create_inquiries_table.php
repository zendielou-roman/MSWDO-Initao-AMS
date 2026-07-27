<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('full_name')->nullable();
            $table->boolean('is_anonymous')->default(false);
            $table->string('barangay');
            $table->string('email')->nullable();
            $table->string('mobile_number')->nullable();
            $table->string('subject');
            $table->text('message');
            $table->string('status')->default('new');
            $table->unsignedBigInteger('assigned_to')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};