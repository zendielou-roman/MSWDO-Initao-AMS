<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up(): void
{
    Schema::create('programs', function (Blueprint $table) {
        $table->id();
        $table->string('program_code')->unique();
        $table->string('name');
        $table->text('description')->nullable();
        $table->string('category');
        $table->string('status')->default('Active');
        $table->unsignedInteger('allocated')->default(0);
        $table->unsignedInteger('released')->default(0);
        $table->unsignedInteger('beneficiaries')->default(0);
        $table->string('focal_person')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};
